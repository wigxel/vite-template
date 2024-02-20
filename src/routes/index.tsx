import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => (
    <div>
      <h1>Wigxel Vite Template</h1>
    </div>
  ),
});
