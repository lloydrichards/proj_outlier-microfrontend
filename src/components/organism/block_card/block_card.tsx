import type { FC } from "react";
import type { RouterOutput } from "@/trpc/react";
import { AnnouncementCard } from "./announcement_card";
import { LighteningCard } from "./lightening_card";
import { NetworkingCard } from "./networking_card";
import { PauseCard } from "./pause_card";
import { SpeakerCard } from "./speaker_card";
import { UnconfCard } from "./unconf_card";

export type BlockCardProps = {
  block: RouterOutput["block"]["getAll"][number];
  className?: string;
};

export const BlockCard: FC<BlockCardProps> = ({ block, className }) => {
  switch (block.type) {
    case "ANNOUNCEMENT":
      return <AnnouncementCard block={block} className={className} />;
    case "LIGHTENING":
      return <LighteningCard block={block} className={className} />;
    case "NETWORKING":
      return <NetworkingCard block={block} className={className} />;
    case "PAUSE":
      return <PauseCard className={className} />;
    case "SPEAKER":
      return <SpeakerCard block={block} className={className} />;
    case "UNCONF":
      return <UnconfCard block={block} className={className} />;
  }
};
