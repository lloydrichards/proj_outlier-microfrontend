import type { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { typefaceMeta, typefaceSubtitle } from "../../typeface";
import type { BlockCardProps } from "./block_card";
import { Badge } from "@/components/ui/badge";

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
    <Card variant="plum" className={className}>
      <CardHeader className="grow">
        <span className={typefaceSubtitle()}>SPEAKER</span>
        <CardTitle>{event?.title}</CardTitle>
        <CardDescription>{event?.description}</CardDescription>
      </CardHeader>
      <Badge variant="plum" className={"absolute right-2 top-2"}>
        {event?.category}
      </Badge>
      <CardContent className="flex gap-2 after:*:[content:','] last:after:*:[content:'']">
        {event?.speakers.map((speaker) => (
          <CardDescription key={speaker.title}>
            {speaker.fullName} {speaker.pronouns && `(${speaker.pronouns})`}
          </CardDescription>
        ))}
      </CardContent>
      <p className={typefaceMeta("absolute bottom-4 right-4 opacity-40")}>
        {block.duration} min
      </p>
    </Card>
  );
};
