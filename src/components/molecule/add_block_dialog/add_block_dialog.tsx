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
import { getTranslations } from "next-intl/server";

export const AddBlockDialog: FC<{ lastTime?: Date }> = async ({ lastTime }) => {
  const session = await auth();
  const t = await getTranslations("Dialog.Block");
  if (session?.user.role != "ADMIN") {
    return null;
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="mustard">
          <CirclePlus /> {t("add_btn")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("add_title")}</DialogTitle>
        </DialogHeader>
        <BlockForm start={lastTime ?? new Date()} />
      </DialogContent>
    </Dialog>
  );
};
