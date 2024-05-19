import type { FC } from "react";
import type { RouterOutput } from "@/trpc/react";
import { AnnouncementCard } from "./announcement_card";
import { LightningCard } from "../lightning_card/lightning_card";
import { NetworkingCard } from "./networking_card";
import { PauseCard } from "./pause_card";
import { SpeakerCard } from "../speaker_card/speaker_card";
import { UnconfCard } from "../unconf_card/unconf_card";
import { cva, type VariantProps } from "class-variance-authority";

const cardVariants = cva("", {
  variants: {
    size: {
      10: "h-30",
      15: "h-30",
      20: "h-30",
      25: "h-35",
      30: "h-40",
      35: "h-45",
      40: "h-50",
      45: "h-55",
      50: "h-60",
      55: "h-65",
      60: "h-70",
      65: "h-75",
      70: "h-80",
      75: "h-85",
      80: "h-90",
      85: "h-95",
      90: "h-100",
      95: "h-105",
      100: "h-110",
      105: "h-115",
      110: "h-120",
      115: "h-125",
      120: "h-130",
    },
  },
});

type SizeType = VariantProps<typeof cardVariants>["size"];

export type AgendaBlock = RouterOutput["block"]["getAgenda"][number];
export type AgendaEvent = AgendaBlock["events"][number];
export type AgendaSpeaker = AgendaEvent["speakers"][number]["speaker"];

export type BlockCardProps = {
  block: AgendaBlock;
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
    case "LIGHTNING":
      return (
        <LightningCard
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
