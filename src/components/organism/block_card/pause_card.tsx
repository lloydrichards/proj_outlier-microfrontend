import type { FC } from "react";
import { Card, CardHeader, CardTitle } from "@/components/atom/card";
import type { BlockCardProps } from "./block_card";
import { typefaceMeta } from "@/components/typeface";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export const PauseCard: FC<BlockCardProps> = ({ block, className }) => {
  const t = useTranslations();
  return (
    <Card
      variant="transparent"
      className={cn("flex items-center justify-center", className)}
    >
      <CardHeader>
        <CardTitle className="text-foreground/50">
          {t("Cards.Pause.title")}
        </CardTitle>
      </CardHeader>
      <p className={typefaceMeta("absolute bottom-4 right-4 opacity-40")}>
        {t("Common.timeInMin", { count: block.duration })}
      </p>
    </Card>
  );
};
