import type { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { typefaceSubtitle } from "../../typeface";
import type { BlockCardProps } from "./block_card";

export const SpeakerCard: FC<BlockCardProps> = ({ block, className }) => {
  if (block.events.length == 0) {
    return (
      <Card variant="plum" className={className}>
        <CardHeader>
          <span className={typefaceSubtitle()}>SPEAKER</span>
          <CardTitle>Nothing scheduled</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  const event = block.events.at(0);
  return (
    <Card variant="plum" className={className}>
      <CardHeader>
        <span className={typefaceSubtitle()}>SPEAKER</span>
        <CardTitle>{event?.title}</CardTitle>
        <CardDescription>{event?.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {event?.speakers.map((speaker) => (
          <p key={speaker.title}>
            {speaker.firstName} {speaker.pronouns && `(${speaker.pronouns})`}
          </p>
        ))}
      </CardContent>
    </Card>
  );
};
