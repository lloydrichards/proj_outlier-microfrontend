import type { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atom/card";
import { typefaceMeta, typefaceSubtitle } from "../../typeface";
import type { BlockCardProps } from "../block_card/block_card";
import { Badge } from "@/components/atom/badge";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/atom/avatar";
import { Popover, PopoverTrigger } from "@/components/atom/popover";
import { SpeakerPopoverContent } from "./speaker_popover_content";
import { useTranslations } from "next-intl";

export const SpeakerCard: FC<BlockCardProps> = ({ block, className }) => {
  const t = useTranslations();
  if (block.events.length == 0) {
    return (
      <Card variant="plum" className={className}>
        <CardHeader>
          <span className={typefaceSubtitle()}>{t("Cards.Speaker.title")}</span>
          <CardDescription>{t("Cards.Speaker.empty_message")}</CardDescription>
        </CardHeader>
        <p className={typefaceMeta("absolute bottom-4 right-4 opacity-40")}>
          {t("Common.timeInMin", { count: block.duration })}
        </p>
      </Card>
    );
  }

  const event = block.events.at(0);

  return (
    <Popover>
      <PopoverTrigger>
        <Card variant="plum" className={cn("text-left", className)}>
          <CardHeader className="z-10 grow">
            <span className={typefaceSubtitle()}>
              {t("Cards.Speaker.title")}
            </span>
            <CardTitle>{event?.title}</CardTitle>
            <CardDescription
              className={cn(
                block.duration > 30 ? "" : "line-clamp-2",
                "z-10 whitespace-pre-wrap",
              )}
            >
              {event?.summary}
            </CardDescription>
          </CardHeader>
          <Badge variant="plum" className={"absolute right-2 top-2 z-10"}>
            {event?.category}
          </Badge>
          <CardContent className="z-10 flex gap-2 after:*:[content:','] last:after:*:[content:'']">
            {event?.speakers.map(({ speaker }) => (
              <CardDescription key={speaker.title}>
                {speaker.fullName}{" "}
                {speaker.pronouns ? `(${speaker.pronouns})` : ""}
              </CardDescription>
            ))}
          </CardContent>
          <div className="absolute bottom-4 right-4 z-0 flex">
            {event?.speakers.map(({ speaker }) => (
              <Avatar
                key={speaker.title}
                className="size-20 opacity-20 saturate-0 md:size-32"
              >
                <AvatarImage src={speaker.imageUrl ?? undefined} />
                <AvatarFallback className="bg-transparent text-plum-foreground">
                  {speaker.firstName[0]}
                  {speaker.lastName[0]}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
          <p className={typefaceMeta("absolute bottom-4 right-4 opacity-40")}>
            {t("Common.timeInMin", { count: block.duration })}
          </p>
        </Card>
      </PopoverTrigger>
      <SpeakerPopoverContent event={event} block={block} />
    </Popover>
  );
};
