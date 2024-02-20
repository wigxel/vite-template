import { Slot as RadixSlot } from "@radix-ui/react-slot";
import React, { useRef, useState } from "react";
import { createPortal } from "react-dom";

export const makePortal = (id: string) => {
  const Outlet = React.forwardRef(function Outlet(
    props: React.ComponentProps<"div">,
  ) {
    const { children, ...PROPS } = props;

    return (
      // @ts-expect-error
      <RadixSlot {...PROPS} id={id}>
        {children}
      </RadixSlot>
    );
  });

  const Slot = ({ children }: React.PropsWithChildren) => {
    const ref = useRef<Element | null>(null);
    const [mounted, setMounted] = useState(false);

    React.useEffect(() => {
      ref.current = document.querySelector<HTMLElement>(`#${id}`);
      setMounted(true);
      return () => setMounted(false);
    }, [id]);

    return mounted && ref.current ? createPortal(children, ref.current) : null;
  };

  return {
    Outlet,
    Slot,
  };
};
