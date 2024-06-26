import type { FC } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atom/card";
import { typefaceMeta, typefaceSubtitle } from "../../typeface";
import type { BlockCardProps } from "./block_card";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export const AnnouncementCard: FC<BlockCardProps> = ({ block, className }) => {
  const t = useTranslations();
  if (block.events.length == 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <span className={typefaceSubtitle()}>
            {t("Cards.Announcement.title")}
          </span>
          <CardDescription>
            {t("Cards.Announcement.empty_message")}
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
          {t("Cards.Announcement.title")}
        </span>
        <CardTitle>{event?.title}</CardTitle>
        {block.duration > 10 && (
          <CardDescription
            className={cn(
              block.duration > 30 ? "" : "line-clamp-2",
              "whitespace-pre-wrap",
            )}
          >
            {event?.summary}
          </CardDescription>
        )}
      </CardHeader>
      <p className={typefaceMeta("absolute bottom-4 right-4 opacity-40")}>
        {t("Common.timeInMin", { count: block.duration })}
      </p>
    </Card>
  );
};
