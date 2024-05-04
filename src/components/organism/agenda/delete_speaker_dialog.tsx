"use client";
import { type FC } from "react";
import { type Speaker } from "@/server/db/schema";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { DialogClose } from "@/components/ui/dialog";
import { typefaceBody } from "@/components/typeface";

export const DeleteSpeakerDialog: FC<{ speaker: Speaker }> = ({ speaker }) => {
  const router = useRouter();
  const deleteSpeaker = api.speaker.delete.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <div className="grid gap-4">
      <p className={typefaceBody()}>
        Are you sure you want to delete {speaker.first_name} {speaker.last_name}
      </p>
      <div className="flex justify-between">
        <DialogClose asChild>
          <Button>Cancel</Button>
        </DialogClose>
        <Button variant="mustard" onClick={() => deleteSpeaker.mutate(speaker)}>
          Delete
        </Button>
      </div>
    </div>
  );
};
