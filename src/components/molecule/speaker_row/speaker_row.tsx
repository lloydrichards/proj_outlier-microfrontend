import type { FC } from "react";
import { CardDescription } from "../../ui/card";
import { typefaceSubtitle } from "../../typeface";
import type { AgendaSpeaker } from "../../organism/block_card/block_card";
import { TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { type VariantProps, cva } from "class-variance-authority";

const avatarVariants = cva("border-2", {
  variants: {
    variant: {
      turquoise: "border-turquoise-foreground bg-turquoise-foreground/90",
      plum: "border-plum-foreground bg-plum-foreground/90",
      mustard: "border-mustard-foreground bg-mustard-foreground/90",
    },
    size: {
      sm: "size-8",
      md: "size-10 md:size-16",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const avatarFallbackVariants = cva("", {
  variants: {
    variant: {
      turquoise: "bg-turquoise-foreground text-turquoise",
      plum: "bg-plum-foreground text-plum",
      mustard: "bg-mustard-foreground text-mustard",
    },
  },
});

type SpeakerRowProps = {
  speaker: AgendaSpeaker;
} & VariantProps<typeof avatarVariants> &
  VariantProps<typeof avatarFallbackVariants>;

export const SpeakerRow: FC<SpeakerRowProps> = ({ speaker, variant, size }) => {
  return (
    <TableRow>
      <TableCell className="flex flex-col gap-2">
        <h2 className={typefaceSubtitle()}>Speaker</h2>
        <div className="flex gap-2">
          <Avatar className={avatarVariants({ variant, size })}>
            <AvatarImage src={speaker?.imageUrl ?? undefined} />
            <AvatarFallback className={avatarFallbackVariants({ variant })}>
              {speaker?.firstName[0]}
              {speaker?.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-center gap-1">
            <CardDescription>
              <strong>
                {speaker?.title ? `${speaker.title} ` : ""}
                {speaker?.fullName}
              </strong>
              {speaker?.pronouns ? ` (${speaker.pronouns})` : ""}
            </CardDescription>
            <CardDescription className="opacity-60">
              {speaker?.bio}
            </CardDescription>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
};
