import type { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { typefaceMeta, typefaceSubtitle } from "../../typeface";
import type {
  AgendaBlock,
  AgendaEvent,
  BlockCardProps,
} from "../block_card/block_card";
import { Badge } from "@/components/ui/badge";
import { cn, formatDate, formatTimeWithMeridiem } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SpeakerRow } from "@/components/molecule/speaker_row/speaker_row";

export const SpeakerCard: FC<BlockCardProps> = ({ block, className }) => {
  if (block.events.length == 0) {
    return (
      <Card variant="plum" className={className}>
        <CardHeader>
          <span className={typefaceSubtitle()}>SPEAKER</span>
          <CardDescription>Nothing scheduled</CardDescription>
        </CardHeader>
        <p className={typefaceMeta("absolute bottom-4 right-4 opacity-40")}>
          {block.duration} min
        </p>
      </Card>
    );
  }

  const event = block.events.at(0);

  return (
    <Popover>
      <PopoverTrigger>
        <Card variant="plum" className={cn("text-left", className)}>
          <CardHeader className="z-10 grow">
            <span className={typefaceSubtitle()}>SPEAKER</span>
            <CardTitle>{event?.title}</CardTitle>
            <CardDescription
              className={cn(
                block.duration > 30 ? "" : "line-clamp-2",
                "z-10 whitespace-pre-wrap",
              )}
            >
              {event?.summary}
            </CardDescription>
          </CardHeader>
          <Badge variant="plum" className={"absolute right-2 top-2 z-10"}>
            {event?.category}
          </Badge>
          <CardContent className="z-10 flex gap-2 after:*:[content:','] last:after:*:[content:'']">
            {event?.speakers.map(({ speaker }) => (
              <CardDescription key={speaker.title}>
                {speaker.fullName}{" "}
                {speaker.pronouns ? `(${speaker.pronouns})` : ""}
              </CardDescription>
            ))}
          </CardContent>
          <div className="absolute bottom-4 right-4 z-0 flex">
            {event?.speakers.map(({ speaker }) => (
              <Avatar
                key={speaker.title}
                className="size-20 opacity-20 saturate-0 md:size-32"
              >
                <AvatarImage src={speaker.imageUrl ?? undefined} />
                <AvatarFallback className="bg-transparent text-plum-foreground">
                  {speaker.firstName[0]}
                  {speaker.lastName[0]}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
          <p className={typefaceMeta("absolute bottom-4 right-4 opacity-40")}>
            {block.duration} min
          </p>
        </Card>
      </PopoverTrigger>
      <SpeakerPopoverContent event={event} block={block} />
    </Popover>
  );
};

const SpeakerPopoverContent: FC<{
  event?: AgendaEvent;
  block: AgendaBlock;
}> = ({ event, block }) => {
  return (
    <PopoverContent className="w-[var(--radix-popover-trigger-width)] border-none bg-plum text-plum-foreground shadow-2xl">
      <Table>
        <TableBody className="[&_tr]:border-plum-foreground [&_tr]:hover:bg-plum [&_tr_td]:px-2 [&_tr_td]:py-3">
          {event?.speakers && event.speakers.length > 0
            ? event?.speakers.map(({ speaker }) => (
                <SpeakerRow key={speaker.id} speaker={speaker} variant="plum" />
              ))
            : null}
          <TableRow>
            <TableCell className="flex flex-col gap-2">
              <h2 className={typefaceSubtitle()}>Description</h2>
              <CardDescription>{event?.description}</CardDescription>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="flex items-center gap-2">
              <h2 className={typefaceSubtitle()}>Location</h2>
              <Badge variant="plum">{event?.location}</Badge>
            </TableCell>
          </TableRow>
          {event?.linkLabel && event.linkUrl ? (
            <TableRow>
              <TableCell className="flex flex-col gap-2">
                <h2 className={typefaceSubtitle()}>Link</h2>
                <CardDescription>
                  <a href={event.linkUrl} target="_blank">
                    {event.linkLabel}
                  </a>
                </CardDescription>
              </TableCell>
            </TableRow>
          ) : null}
          <TableRow>
            <TableCell className="flex items-center gap-2">
              <h2 className={typefaceSubtitle()}>Date</h2>
              <CardDescription>{formatDate(block.start)}</CardDescription>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="flex items-center gap-2">
              <h2 className={typefaceSubtitle()}>Time</h2>
              <CardDescription>
                {formatTimeWithMeridiem(block.start)} &#8594;{" "}
                {formatTimeWithMeridiem(block.end)} ({block.duration} min)
              </CardDescription>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </PopoverContent>
  );
};
