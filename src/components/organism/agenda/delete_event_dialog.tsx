"use client";
import { type FC } from "react";
import { type RouterOutput, api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { DialogClose } from "@/components/ui/dialog";
import { typefaceBody } from "@/components/typeface";

export const DeleteEventDialog: FC<{
  event: RouterOutput["block"]["getAll"][number]["events"][number];
}> = ({ event }) => {
  const router = useRouter();
  const deleteEvent = api.event.delete.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <div className="grid gap-4">
      <p className={typefaceBody()}>
        Are you sure you want to delete {event.title}
      </p>
      <div className="flex justify-between">
        <DialogClose asChild>
          <Button>Cancel</Button>
        </DialogClose>
        <Button variant="mustard" onClick={() => deleteEvent.mutate(event)}>
          Delete
        </Button>
      </div>
    </div>
  );
};
