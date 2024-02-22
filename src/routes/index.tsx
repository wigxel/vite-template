import { createFileRoute } from "@tanstack/react-router";
import { Button } from "~/@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogRemote,
  DialogRemoteTrigger,
  DialogTitle,
} from "~/@/components/ui/remote-dialog";
import { ModalProvider, useModalHandle } from "~/@/hooks/use-modal";

export const Route = createFileRoute("/")({
  component: () => (
    <div>
      <h1>Wigxel Vite Template</h1>

      <ModalProvider>
        <DialogRemoteTrigger modalId="add_item" params={{ name: "Johnson" }}>
          <Button>More Information</Button>
        </DialogRemoteTrigger>

        <MoreInformationDialog />
      </ModalProvider>
    </div>
  ),
});

function MoreInformationDialog() {
  const modal = useModalHandle("add_item");

  return (
    <DialogRemote id={"add_item"}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hi</DialogTitle>
          <DialogDescription>You asked for more information</DialogDescription>
        </DialogHeader>

        <p className="align-center flex aspect-square justify-center">
          {modal?.data?.name}
        </p>
      </DialogContent>
    </DialogRemote>
  );
}
