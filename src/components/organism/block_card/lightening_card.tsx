import type { FC } from "react";
import { Card, CardDescription, CardHeader } from "../../ui/card";
import { typefaceMeta, typefaceSubtitle } from "../../typeface";
import type { BlockCardProps } from "./block_card";

export const LighteningCard: FC<BlockCardProps> = ({ block, className }) => {
  if (block.events.length == 0) {
    return (
      <Card variant="turquoise" className={className}>
        <CardHeader>
          <span className={typefaceSubtitle()}>LIGHTENING</span>
          <CardDescription>Nothing scheduled</CardDescription>
        </CardHeader>
        <p className={typefaceMeta("absolute bottom-0 right-2 opacity-40")}>
          {block.duration} min
        </p>
      </Card>
    );
  }

  const event = block.events.at(0);
  const speaker = event?.speakers.at(0);

  return (
    <Card variant="turquoise" className={className}>
      <CardHeader>
        <span className={typefaceSubtitle()}>LIGHTENING</span>
        <CardDescription className="line-clamp-1">
          {event?.title} - {speaker?.fullName}
        </CardDescription>
      </CardHeader>

      <p className={typefaceMeta("absolute bottom-0 right-2 opacity-40")}>
        {block.duration} min
      </p>
    </Card>
  );
};
