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

export const UnconfCard: FC<BlockCardProps> = ({ className }) => {
  return (
    <Card variant="mustard" className={className}>
      <CardHeader>
        <span className={typefaceSubtitle()}>UNCONF</span>
        <CardTitle></CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};
