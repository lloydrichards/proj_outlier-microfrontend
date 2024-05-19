import { BlockForm } from "@/components/organism/block_form/block_form";
import { Button } from "@/components/atom/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/atom/dialog";
import { auth } from "@/server/auth";
import { CirclePlus } from "lucide-react";
import { type FC } from "react";

export const AddBlockDialog: FC<{ lastTime?: Date }> = async ({ lastTime }) => {
  const session = await auth();

  if (session?.user.role != "ADMIN") {
    return null;
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="mustard">
          <CirclePlus /> Add
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New block</DialogTitle>
        </DialogHeader>
        <BlockForm start={lastTime ?? new Date()} />
      </DialogContent>
    </Dialog>
  );
};
