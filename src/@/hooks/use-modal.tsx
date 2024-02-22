import { GlobalStateProvider, useGlobalState } from "../contexts/global-state";

// Usage:
// const modal = useModal();
// modal.show("add_item", { id: "kelvin" });
// modal.hide("delete_item");
// modal.toggle("edit_item", { name: "" });

export type EventsMap = {
  add_item: { name: string };
};

type ModalAPI<TKey, TData> = {
  show: (data: TData) => void;
  hide: () => void;
  toggle: (data: TData) => void;
  isVisible: boolean;
  key: TKey;
  data: TData;
};

export type ModalKeys = keyof EventsMap;

function useModal() {
  return useGlobalState<EventsMap>();
}

function useModalHandle<TKey extends keyof EventsMap, D = EventsMap[TKey]>(
  key: TKey,
): ModalAPI<TKey, D> {
  const modal = useGlobalState<EventsMap>();

  return Object.assign(
    {},
    {
      key,
      // @ts-expect-error
      show: (data: D) => modal.show<TKey>(key, data),
      hide: () => modal.hide(key as TKey),
      // @ts-expect-error
      toggle: (data: D) => modal.toggle(key, data),
      data: modal.params.get(key),
      isVisible: modal.store[key] === true,
    },
  ) as unknown as ModalAPI<TKey, D>;
}

function useModalState(key: keyof EventsMap): boolean {
  return useGlobalState<EventsMap>().store[key];
}

const ModalProvider = GlobalStateProvider;

export { useModal, useModalHandle, ModalProvider, useModalState };
