"use client";
import { type FC } from "react";
import { type Block } from "@/server/db/schema";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { DialogClose } from "@/components/ui/dialog";
import { typefaceBody } from "@/components/typeface";

export const DeleteBlockDialog: FC<{ block: Block }> = ({ block }) => {
  const router = useRouter();
  const deleteBlock = api.block.delete.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <div className="grid gap-4">
      <p className={typefaceBody()}>
        Are you sure you want to delete {block.type} block?
      </p>
      <div className="flex justify-between">
        <DialogClose asChild>
          <Button>Cancel</Button>
        </DialogClose>
        <Button variant="mustard" onClick={() => deleteBlock.mutate(block)}>
          Delete
        </Button>
      </div>
    </div>
  );
};
