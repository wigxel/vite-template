import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "~/routeTree.gen";
import { QueryProvider } from "./contexts/react-query";

export function App() {
  return (
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  );
}

const router = createRouter({
  routeTree,
  globalNotFound: () => <div>Page not found</div>,
  defaultPreload: "intent",
});
