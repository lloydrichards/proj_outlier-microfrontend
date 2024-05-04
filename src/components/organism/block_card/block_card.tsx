import type { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import type { Block, Event, Speaker } from "@/server/db/schema";
import { cn } from "@/lib/utils";
import { typefaceSubtitle } from "../../typeface";

type BlockCardProps = {
  block: Block & { events: Array<Event & { speakers: Speaker[] }> };
  className?: string;
};

export const BlockCard: FC<BlockCardProps> = ({ block, className }) => {
  switch (block.type) {
    case "ANNOUNCEMENT":
      return (
        <Card className={className}>
          <CardHeader>
            <span className={typefaceSubtitle()}>ANNOUNCEMENT</span>
            {block.events.length > 0 ? (
              <>
                <CardTitle>{block.events.at(0)?.title}</CardTitle>
                <CardDescription>
                  {block.events.at(0)?.description}
                </CardDescription>
              </>
            ) : (
              <CardTitle>Nothing scheduled</CardTitle>
            )}
          </CardHeader>
        </Card>
      );
    case "LIGHTENING":
      return (
        <Card variant="turquoise" className={cn("", className)}>
          <CardHeader>
            <span className={typefaceSubtitle()}>LIGHTENING</span>
          </CardHeader>
          <CardContent>
            {block.events.length > 0 ? (
              <>
                {block.events.at(0)?.speakers.map((speaker) => (
                  <p key={speaker.title}>
                    {block.events.at(0)?.title} - {speaker.first_name}{" "}
                    {speaker.last_name}
                  </p>
                ))}
              </>
            ) : (
              <p>Nothing scheduled</p>
            )}
          </CardContent>
        </Card>
      );
    case "NETWORKING":
      return (
        <Card className={className}>
          <CardHeader>
            <span className={typefaceSubtitle()}>NETWORKING</span>
            {block.events.length > 0 ? (
              <>
                <CardTitle>{block.events.at(0)?.title}</CardTitle>
                <CardDescription>
                  {block.events.at(0)?.description}
                </CardDescription>
              </>
            ) : (
              <CardTitle>Nothing scheduled</CardTitle>
            )}
          </CardHeader>
        </Card>
      );
    case "PAUSE":
      return (
        <Card variant="transparent" className={cn("", className)}>
          <CardHeader>
            <CardTitle className="text-center text-foreground/50">
              PAUSE
            </CardTitle>
          </CardHeader>
        </Card>
      );
    case "SPEAKER":
      return (
        <Card variant="plum" className={cn("", className)}>
          <CardHeader>
            <span className={typefaceSubtitle()}>SPEAKER</span>
            {block.events.length > 0 ? (
              <>
                <CardTitle>{block.events.at(0)?.title}</CardTitle>
                <CardDescription>
                  {block.events.at(0)?.description}
                </CardDescription>
              </>
            ) : (
              <CardTitle>Nothing scheduled</CardTitle>
            )}
          </CardHeader>
          {block.events.length > 0 && (
            <CardContent>
              {block.events.at(0)?.speakers.map((speaker) => (
                <p key={speaker.title}>
                  {speaker.first_name} {speaker.last_name} ({speaker.pronouns})
                </p>
              ))}
            </CardContent>
          )}
        </Card>
      );
    case "UNCONF":
      return (
        <Card variant="mustard" className={cn("", className)}>
          <CardHeader>
            <span className={typefaceSubtitle()}>UNCONF</span>
            <CardTitle></CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      );
  }
};
