import type { FC } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { typefaceSubtitle } from "../../typeface";
import type { BlockCardProps } from "./block_card";

export const NetworkingCard: FC<BlockCardProps> = ({ block, className }) => {
  if (block.events.length == 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <span className={typefaceSubtitle()}>NETWORKING</span>
          <CardTitle>Nothing scheduled</CardTitle>
        </CardHeader>
      </Card>
    );
  }
  const event = block.events.at(0);
  return (
    <Card className={className}>
      <CardHeader>
        <span className={typefaceSubtitle()}>NETWORKING</span>
        <CardTitle>{event?.title}</CardTitle>
        <CardDescription>{event?.description}</CardDescription>
      </CardHeader>
    </Card>
  );
};
