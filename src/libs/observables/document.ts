import { Subject, filter, fromEvent, map, merge } from "rxjs";

type PageState = "frozen" | "terminated" | "hidden" | "active" | "passive";

type PageStateEvent = { state: PageState };

export const pageVisibility$ = new Subject<PageStateEvent>();

export const pageUnload$ = fromEvent(window, "beforeunload");

export const pageLifeCycleState$ = merge(
  pageVisibility$,
  pageUnload$.pipe(map(() => ({ state: "beforeunload" as const }))),
);

export const exitStates$ = pageLifeCycleState$.pipe(
  filter((v) => ["beforeunload", "passive"].includes(v.state)),
);

function observePageLifeCycle() {
  const getState = () => {
    if (document.visibilityState === "hidden") {
      return "hidden";
    }
    if (document.hasFocus()) {
      return "active";
    }
    return "passive";
  };

  // Stores the initial state using the `getState()` function (defined above).
  let state = getState();

  // Accepts a next state and, if there's been a state change, logs the
  // change to the console. It also updates the `state` value defined above.
  const logStateChange = (nextState: PageState) => {
    const prevState = state;
    pageVisibility$.next({ state: nextState });
    if (nextState !== prevState) {
      state = nextState;
    }
  };

  // Options used for all event listeners.
  const opts = { capture: true };

  // These lifecycle events can all use the same listener to observe state
  // changes (they call the `getState()` function to determine the next state).
  const events = ["pageshow", "focus", "blur", "visibilitychange", "resume"];
  const handles = new Set<() => void>();
  const addEventListener: typeof window.addEventListener = (type, fn, opt) => {
    window.addEventListener(type, fn, opt);
    handles.add(() => window.removeEventListener(type, fn));
  };

  for (const type of events) {
    addEventListener(type, () => logStateChange(getState()), opts);
  }

  // The next two listeners, on the other hand, can determine the next
  // state from the event itself.
  addEventListener(
    "freeze",
    () => {
      // In the freeze event, the next state is always frozen.
      logStateChange("frozen");
    },
    opts,
  );

  addEventListener(
    "pagehide",
    (event) => {
      // If the event's persisted property is `true` the page is about
      // to enter the back/forward cache, which is also in the frozen state.
      // If the event's persisted property is not `true` the page is
      // about to be unloaded.
      logStateChange(event.persisted ? "frozen" : "terminated");
    },
    opts,
  );

  return () => {
    for (const fn of Array.from(handles.values())) {
      // unsubscribe
      fn();
    }
    handles.clear();
  };
}

// automatically listen for changes
observePageLifeCycle();
