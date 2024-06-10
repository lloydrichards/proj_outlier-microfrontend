import type { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atom/card";
import { typefaceMeta, typefaceSubtitle } from "../../typeface";
import type { BlockCardProps } from "./block_card";
import { useTranslations } from "next-intl";

export const NetworkingCard: FC<BlockCardProps> = ({ block, className }) => {
  const t = useTranslations();
  if (block.events.length == 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <span className={typefaceSubtitle()}>
            {t("Cards.Networking.title")}
          </span>
          <CardDescription>
            {t("Cards.Networking.empty_message")}
          </CardDescription>
        </CardHeader>
        <p className={typefaceMeta("absolute bottom-4 right-4 opacity-40")}>
          {t("Common.timeInMin", { count: block.duration })}
        </p>
      </Card>
    );
  }
  const event = block.events.at(0);
  return (
    <Card className={className}>
      <CardHeader>
        <span className={typefaceSubtitle()}>
          {t("Cards.Networking.title")}
        </span>
        <CardTitle className="line-clamp-2">{event?.title}</CardTitle>
        <CardDescription>{event?.summary}</CardDescription>
      </CardHeader>
      <CardContent className="z-10 flex gap-2 after:*:[content:','] last:after:*:[content:'']">
        {event?.speakers.map(({ speaker }) => (
          <CardDescription key={speaker.title}>
            {speaker.fullName} {speaker.pronouns ? `(${speaker.pronouns})` : ""}
          </CardDescription>
        ))}
      </CardContent>
      <p className={typefaceMeta("absolute bottom-4 right-4 opacity-40")}>
        {t("Common.timeInMin", { count: block.duration })}
      </p>
    </Card>
  );
};
