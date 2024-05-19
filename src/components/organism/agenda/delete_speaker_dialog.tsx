"use client";
import { type FC } from "react";
import { type RouterOutput, api } from "@/trpc/react";
import { Button } from "@/components/atom/button";
import { useRouter } from "next/navigation";
import { DialogClose } from "@/components/atom/dialog";
import { typefaceBody } from "@/components/typeface";

export const DeleteSpeakerDialog: FC<{
  speaker: RouterOutput["block"]["getAgenda"][number]["events"][number]["speakers"][number]["speaker"];
}> = ({ speaker }) => {
  const router = useRouter();
  const deleteSpeaker = api.speaker.delete.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <div className="grid gap-4">
      <p className={typefaceBody()}>
        Are you sure you want to delete {speaker.fullName}
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
