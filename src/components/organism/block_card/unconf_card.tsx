import type { FC } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { typefaceMeta, typefaceSubtitle } from "../../typeface";
import type { BlockCardProps } from "./block_card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const UnconfCard: FC<BlockCardProps> = ({ block, className }) => {
  if (block.events.length == 0) {
    return (
      <Card variant="mustard" className={className}>
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
  return (
    <Card
      variant="transparent"
      className={cn(
        "relative -left-40 w-[calc(100%+10rem)] overflow-hidden rounded-none",
        className,
      )}
    >
      <CardHeader className="ml-40">
        <span className={typefaceSubtitle()}>UNCONF</span>
      </CardHeader>
      <section className="flex h-full gap-2 overflow-x-scroll pl-40">
        {block.events.map((event) => (
          <Card
            key={event.id}
            variant="mustard"
            className="h-full w-1/2 min-w-96"
          >
            <CardHeader>
              <CardTitle className="line-clamp-1">{event.title}</CardTitle>
              <CardDescription className="line-clamp-3">
                {event.description}
              </CardDescription>
              <CardDescription>
                Organized by:{event.speakers.at(0)?.fullName}
              </CardDescription>
              <Badge variant="mustard" className={"absolute right-2 top-2"}>
                {event.category}
              </Badge>
              <Badge
                variant="mustard"
                className={"absolute bottom-2 left-2 opacity-50"}
              >
                {event.location}
              </Badge>
            </CardHeader>
          </Card>
        ))}
      </section>
      <p className={typefaceMeta("absolute bottom-4 right-4 opacity-40")}>
        {block.duration} min
      </p>
    </Card>
  );
};
