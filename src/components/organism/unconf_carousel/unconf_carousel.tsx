import type { FC } from "react";
import { Card, CardDescription, CardHeader } from "@/components/atom/card";
import { typefaceMeta, typefaceSubtitle } from "../../typeface";
import type { BlockCardProps } from "../block_card/block_card";
import { cn } from "@/lib/utils";
import { UnconfCard } from "./unconf_card";
import { useTranslations } from "next-intl";

export const UnconfCarousel: FC<BlockCardProps> = ({ block, className }) => {
  const t = useTranslations();
  if (block.events.length == 0) {
    return (
      <Card variant="mustard" className={className}>
        <CardHeader>
          <span className={typefaceSubtitle()}>{t("Cards.Unconf.title")}</span>
          <CardDescription>{t("Cards.Unconf.empty_message")}</CardDescription>
        </CardHeader>
        <p className={typefaceMeta("absolute bottom-4 right-4 opacity-40")}>
          {t("Common.timeInMin", { count: block.duration })}
        </p>
      </Card>
    );
  }
  return (
    <Card
      variant="transparent"
      className={cn(
        "relative -left-40 w-[calc(100%+10rem)] overflow-hidden rounded-none",
        className,
      )}
    >
      <CardHeader className="ml-40">
        <span className={typefaceSubtitle()}>{t("Cards.Unconf.title")}</span>
      </CardHeader>
      <section className="flex h-full gap-2 overflow-x-scroll pl-40">
        {block.events.map((event) => (
          <UnconfCard key={event.id} event={event} />
        ))}
      </section>
      <p className={typefaceMeta("absolute bottom-4 right-4 opacity-40")}>
        {t("Common.timeInMin", { count: block.duration })}
      </p>
    </Card>
  );
};
