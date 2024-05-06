import type { FC } from "react";
import type { RouterOutput } from "@/trpc/react";
import { AnnouncementCard } from "./announcement_card";
import { LighteningCard } from "./lightening_card";
import { NetworkingCard } from "./networking_card";
import { PauseCard } from "./pause_card";
import { SpeakerCard } from "./speaker_card";
import { UnconfCard } from "./unconf_card";
import { cva, type VariantProps } from "class-variance-authority";

const cardVariants = cva("", {
  variants: {
    size: {
      10: "h-30",
      20: "h-30",
      30: "h-40",
      40: "h-50",
      45: "h-55",
      50: "h-60",
      60: "h-70",
      70: "h-80",
      80: "h-90",
      90: "h-100",
      100: "h-110",
      110: "h-120",
      120: "h-130",
    },
  },
});

type SizeType = VariantProps<typeof cardVariants>["size"];

export type BlockCardProps = {
  block: RouterOutput["block"]["getAgenda"][number];
  className?: string;
};

export const BlockCard: FC<BlockCardProps> = ({ block, className }) => {
  switch (block.type) {
    case "ANNOUNCEMENT":
      return (
        <AnnouncementCard
          block={block}
          className={cardVariants({
            size: block.duration as VariantProps<typeof cardVariants>["size"],
            className,
          })}
        />
      );
    case "LIGHTENING":
      return (
        <LighteningCard
          block={block}
          className={cardVariants({
            size: block.duration as SizeType,
            className,
          })}
        />
      );
    case "NETWORKING":
      return (
        <NetworkingCard
          block={block}
          className={cardVariants({
            size: block.duration as SizeType,
            className,
          })}
        />
      );
    case "PAUSE":
      return (
        <PauseCard
          block={block}
          className={cardVariants({
            size: block.duration as SizeType,
            className,
          })}
        />
      );
    case "SPEAKER":
      return (
        <SpeakerCard
          block={block}
          className={cardVariants({
            size: block.duration as SizeType,
            className,
          })}
        />
      );
    case "UNCONF":
      return (
        <UnconfCard
          block={block}
          className={cardVariants({
            size: block.duration as SizeType,
            className,
          })}
        />
      );
  }
};
