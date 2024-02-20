import React from "react";

import { Loader2 } from "lucide-react";
import { cn } from "~/@/lib/utils";

type LoadingButtonProps = {
  replace?: boolean;
  loading?: boolean;
  children?: React.ReactNode;
  Icon?: React.JSX.Element;
};

export const LoadingButtonContent = React.forwardRef<
  HTMLSpanElement,
  LoadingButtonProps
>(function LoadingButtonContent(props, ref) {
  const { loading, children, Icon } = props;

  return (
    <LoaderContent ref={ref} isLoading={loading}>
      {Icon ? (
        <span className={"inline-flex items-center self-center text-xl"}>
          {React.cloneElement(Icon, { fontSize: "inherit" }, null)}
        </span>
      ) : null}

      {!children ? null : (
        <span className={"inline-flex items-center self-stretch"}>
          {children}
        </span>
      )}
    </LoaderContent>
  );
});

export const LoaderContent = React.forwardRef<
  HTMLSpanElement,
  {
    isLoading: boolean | undefined;
    children: React.ReactNode;
    className?: string;
  }
>(function LoaderContent(props, ref) {
  return (
    <span ref={ref} className={"relative flex items-center justify-center"}>
      <span
        className={cn(
          props.className,
          "pointer-events-none absolute left-1/2 top-1/2 origin-center -translate-x-1/2 -translate-y-1/2 opacity-0 duration-200 ease-in-out",
          {
            "pointer-events-auto opacity-100": props.isLoading,
          },
        )}
      >
        <Loader2 className={"animate-spin"} />
      </span>
      <span
        className={cn(
          "inline-flex items-center justify-center space-x-1 opacity-100 duration-200 ease-in-out",
          {
            "translate-y-2 opacity-0": props.isLoading,
          },
        )}
      >
        {props.children}
      </span>
    </span>
  );
});
