import { range } from "ramda";
import React from "react";

type SkeletonContentProps = {
  isLoading: boolean;
  count?: number;
  children: React.ReactNode;
  Component: React.FC<Partial<{ className: string }>>;
};

export function SkeletonContent({
  children,
  count = 4,
  isLoading,
  Component,
}: SkeletonContentProps) {
  if (!isLoading) return <>{children}</>;

  return (
    <>
      {range(0, count).map((idx) => {
        return <Component key={idx} />;
      })}
    </>
  );
}
