import type { FC } from "react";
import { Card, CardDescription, CardHeader } from "../../ui/card";
import { typefaceMeta, typefaceSubtitle } from "../../typeface";
import type { BlockCardProps } from "../block_card/block_card";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { LightningPopoverContent } from "./lightning_popover_content";

export const LightningCard: FC<BlockCardProps> = ({ block, className }) => {
  if (block.events.length == 0) {
    return (
      <Card variant="turquoise" className={className}>
        <CardHeader>
          <span className={typefaceSubtitle()}>LIGHTNING</span>
          <CardDescription>Nothing scheduled</CardDescription>
        </CardHeader>
        <p className={typefaceMeta("absolute bottom-4 right-4 opacity-40")}>
          {block.duration} min
        </p>
      </Card>
    );
  }

  const event = block.events.at(0);
  const speaker = event?.speakers.at(0)?.speaker;

  return (
    <Popover>
      <PopoverTrigger>
        <Card variant="turquoise" className={cn("text-left", className)}>
          <CardHeader>
            <span className={typefaceSubtitle()}>LIGHTNING</span>
            <CardDescription className="line-clamp-1">
              <strong>{event?.title} -</strong> {speaker?.fullName}{" "}
              {speaker?.pronouns ? `(${speaker.pronouns})` : ""}
            </CardDescription>
          </CardHeader>

          <p className={typefaceMeta("absolute bottom-4 right-4 opacity-40")}>
            {block.duration} min
          </p>
        </Card>
      </PopoverTrigger>
      <LightningPopoverContent event={event} />
    </Popover>
  );
};
