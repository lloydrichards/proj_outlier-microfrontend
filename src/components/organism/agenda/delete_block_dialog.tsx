"use client";
import { type FC } from "react";
import { type Block } from "@/server/db/schema";
import { api } from "@/trpc/react";
import { Button } from "@/components/atom/button";
import { useRouter } from "next/navigation";
import { DialogClose } from "@/components/atom/dialog";
import { typefaceBody } from "@/components/typeface";
import { timeFormat } from "d3-time-format";
import { useTranslations } from "next-intl";

export const DeleteBlockDialog: FC<{ block: Block }> = ({ block }) => {
  const router = useRouter();
  const t = useTranslations("Dialog.Block");
  const deleteBlock = api.block.delete.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });
  const format = timeFormat("%I:%M %p");
  return (
    <div className="grid gap-4">
      <p className={typefaceBody()}>
        {t("delete_message", { type: block.type, time: format(block.start) })}
      </p>
      <div className="flex justify-between">
        <DialogClose asChild>
          <Button>{t("delete_cancel_btn")}</Button>
        </DialogClose>
        <Button variant="mustard" onClick={() => deleteBlock.mutate(block)}>
          {t("delete_confirm_btn")}
        </Button>
      </div>
    </div>
  );
};
