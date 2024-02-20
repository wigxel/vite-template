import React from "react";

const ctx = React.createContext<unknown>({});

type HandlerFn<TRecord, UParams = unknown> = <TKey extends keyof TRecord>(
  ...args: TRecord[TKey] extends undefined
    ? [TKey]
    : UParams extends undefined
      ? [TKey]
      : [TKey, TRecord[TKey]]
) => void;

export interface MapFromRecord<TRecord extends Record<string, unknown>> {
  get<K extends keyof TRecord>(key: K): TRecord[K];
  set<K extends keyof TRecord>(key: K, value: TRecord[K]): void;
  delete<K extends keyof TRecord>(key: K): boolean;
  has<K extends keyof TRecord>(key: K): boolean;
  clear(): void;
}

type GlobalStateHandler<TRecord extends Record<string, unknown>> = {
  show: HandlerFn<TRecord>;
  toggle: HandlerFn<TRecord>;
  hide: HandlerFn<TRecord, undefined>;
  attach: HandlerFn<TRecord, undefined>;
  params: MapFromRecord<TRecord>;
  store: Record<keyof TRecord, boolean>;
};

const FallbackParam = {} as unknown;

export function useGlobalState<
  T extends Record<string, unknown>,
>(): GlobalStateHandler<T> {
  // @ts-expect-error
  return React.useContext(ctx);
}

export function GlobalStateProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [state, setState] = React.useState<Record<string, boolean>>({});
  const nameParamMap = React.useRef(new Map()).current;

  const setTo = (newState: boolean, name: string) => {
    setState((e) => ({ ...e, [name]: newState }));
  };

  const addOrRemoveParams = (
    toggleState: "hide" | "show",
    name: string,
    params = FallbackParam,
  ) =>
    toggleState === "show"
      ? nameParamMap.set(name, params)
      : nameParamMap.delete(name);

  const show = (name: string, params = FallbackParam) => {
    addOrRemoveParams("show", name, params);
    setTo(true, name);
  };

  const hide = (name: string) => {
    addOrRemoveParams("hide", name);
    setTo(false, name);
  };

  const detach = (name: string) =>
    setState((state) => {
      const newState = { ...state };
      delete newState[name];
      return newState;
    });

  const toggle = (name: string, params = FallbackParam) => {
    const newState = !state[name];
    newState ? show(name, params) : hide(name);
  };

  const ctxValue = {
    store: state,
    params: nameParamMap,
    detach,
    show,
    hide,
    attach: hide,
    toggle,
  };

  return <ctx.Provider value={ctxValue}>{children}</ctx.Provider>;
}
