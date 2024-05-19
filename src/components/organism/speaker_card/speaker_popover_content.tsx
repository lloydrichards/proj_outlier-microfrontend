import type { FC } from "react";
import { CardDescription } from "@/components/atom/card";
import { typefaceSubtitle } from "../../typeface";
import type { AgendaBlock, AgendaEvent } from "../block_card/block_card";
import { Badge } from "@/components/atom/badge";
import { formatDate, formatTimeWithMeridiem } from "@/lib/utils";
import { Table, TableBody, TableCell, TableRow } from "@/components/atom/table";
import { PopoverContent } from "@/components/atom/popover";
import { SpeakerRow } from "@/components/molecule/speaker_row/speaker_row";

export const SpeakerPopoverContent: FC<{
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
