import type { FC } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { typefaceMeta, typefaceSubtitle } from "../../typeface";
import type { BlockCardProps } from "./block_card";

export const AnnouncementCard: FC<BlockCardProps> = ({ block, className }) => {
  if (block.events.length == 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <span className={typefaceSubtitle()}>ANNOUNCEMENT</span>
          <CardDescription>Nothing scheduled</CardDescription>
        </CardHeader>
        <p className={typefaceMeta("absolute bottom-0 right-2 opacity-40")}>
          {block.duration} min
        </p>
      </Card>
    );
  }

  const event = block.events.at(0);
  return (
    <Card className={className}>
      <CardHeader>
        <span className={typefaceSubtitle()}>ANNOUNCEMENT</span>
        <CardTitle>{event?.title}</CardTitle>
        <CardDescription>{event?.description}</CardDescription>
      </CardHeader>
      <p className={typefaceMeta("absolute bottom-0 right-2 opacity-40")}>
        {block.duration} min
      </p>
    </Card>
  );
};
