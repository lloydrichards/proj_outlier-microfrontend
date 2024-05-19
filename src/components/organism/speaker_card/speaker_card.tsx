import type { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { typefaceMeta, typefaceSubtitle } from "../../typeface";
import type { BlockCardProps } from "../block_card/block_card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { SpeakerPopoverContent } from "./speaker_popover_content";

export const SpeakerCard: FC<BlockCardProps> = ({ block, className }) => {
  if (block.events.length == 0) {
    return (
      <Card variant="plum" className={className}>
        <CardHeader>
          <span className={typefaceSubtitle()}>SPEAKER</span>
          <CardDescription>Nothing scheduled</CardDescription>
        </CardHeader>
        <p className={typefaceMeta("absolute bottom-4 right-4 opacity-40")}>
          {block.duration} min
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
            <span className={typefaceSubtitle()}>SPEAKER</span>
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
            {block.duration} min
          </p>
        </Card>
      </PopoverTrigger>
      <SpeakerPopoverContent event={event} block={block} />
    </Popover>
  );
};
