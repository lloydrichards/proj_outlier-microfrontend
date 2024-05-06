import type { FC } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { typefaceMeta, typefaceSubtitle } from "../../typeface";
import type { BlockCardProps } from "./block_card";

export const UnconfCard: FC<BlockCardProps> = ({ block, className }) => {
  return (
    <Card variant="mustard" className={className}>
      <CardHeader>
        <span className={typefaceSubtitle()}>UNCONF</span>
        <CardTitle></CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <p className={typefaceMeta("absolute bottom-2 right-2 opacity-40")}>
        {block.duration} min
      </p>
    </Card>
  );
};
