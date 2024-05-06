import type { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { typefaceSubtitle } from "../../typeface";
import type { BlockCardProps } from "./block_card";

export const LighteningCard: FC<BlockCardProps> = ({ block, className }) => {
  if (block.events.length == 0) {
    return (
      <Card variant="turquoise" className={className}>
        <CardHeader>
          <span className={typefaceSubtitle()}>LIGHTENING</span>
          <CardTitle>Nothing scheduled</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  const event = block.events.at(0);
  const speaker = event?.speakers.at(0);

  return (
    <Card variant="turquoise" className={className}>
      <CardHeader>
        <span className={typefaceSubtitle()}>LIGHTENING</span>
        <CardContent>
          <p>
            {event?.title} - {speaker?.fullName}
          </p>
        </CardContent>
      </CardHeader>
    </Card>
  );
};
