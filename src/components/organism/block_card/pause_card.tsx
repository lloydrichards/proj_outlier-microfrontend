import type { FC } from "react";
import { Card, CardHeader, CardTitle } from "../../ui/card";
import type { BlockCardProps } from "./block_card";
import { typefaceMeta } from "@/components/typeface";
import { cn } from "@/lib/utils";

export const PauseCard: FC<BlockCardProps> = ({ block, className }) => {
  return (
    <Card
      variant="transparent"
      className={cn("flex items-center justify-center", className)}
    >
      <CardHeader>
        <CardTitle className="text-foreground/50">PAUSE</CardTitle>
      </CardHeader>
      <p className={typefaceMeta("absolute bottom-2 right-2 opacity-40")}>
        {block.duration} min
      </p>
    </Card>
  );
};
