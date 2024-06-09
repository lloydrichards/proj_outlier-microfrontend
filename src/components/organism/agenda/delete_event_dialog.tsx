"use client";
import { type FC } from "react";
import { type RouterOutput, api } from "@/trpc/react";
import { Button } from "@/components/atom/button";
import { useRouter } from "next/navigation";
import { DialogClose } from "@/components/atom/dialog";
import { typefaceBody } from "@/components/typeface";
import { useTranslations } from "next-intl";

export const DeleteEventDialog: FC<{
  event: RouterOutput["block"]["getAgenda"][number]["events"][number];
}> = ({ event }) => {
  const router = useRouter();
  const t = useTranslations("Dialog.Event");
  const deleteEvent = api.event.delete.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <div className="grid gap-4">
      <p className={typefaceBody()}>
        {t("delete_message", { event: event.title })}
      </p>
      <div className="flex justify-between">
        <DialogClose asChild>
          <Button>{t("delete_cancel_btn")}</Button>
        </DialogClose>
        <Button variant="mustard" onClick={() => deleteEvent.mutate(event)}>
          {t("delete_confirm_btn")}
        </Button>
      </div>
    </div>
  );
};
