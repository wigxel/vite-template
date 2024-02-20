import React from "react";
import { cn } from "~/@/lib/utils";

export function FormItemSplit(props: {
  className?: string;
  children?: React.ReactNode;
}) {
  const [first, ...rest] = React.Children.toArray(props.children);

  return (
    <div className={cn("flex justify-between", props.className)}>
      <div className="flex-1">{first}</div>
      <div className="flex max-w-xs flex-1 flex-col">{rest}</div>
    </div>
  );
}
