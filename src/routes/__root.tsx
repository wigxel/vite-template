import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { TanStackRouterDevtools } from "~/components/tanstack";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Outlet />
      {/* Start rendering router matches */}
      <Suspense fallback={null}>
        <TanStackRouterDevtools />
      </Suspense>
    </>
  );
}
