import type { FC } from "react";
import { CardDescription } from "@/components/atom/card";
import { typefaceSubtitle } from "../../typeface";
import type { AgendaEvent } from "../block_card/block_card";
import { Badge } from "@/components/atom/badge";
import { Table, TableBody, TableCell, TableRow } from "@/components/atom/table";
import { PopoverContent } from "@/components/atom/popover";
import { SpeakerRow } from "@/components/molecule/speaker_row/speaker_row";

export const UnconfPopoverContent: FC<{
  event?: AgendaEvent;
}> = ({ event }) => {
  return (
    <PopoverContent className="w-[var(--radix-popover-trigger-width)] border-none bg-mustard text-mustard-foreground shadow-2xl">
      <Table>
        <TableBody className="[&_tr]:border-mustard-foreground [&_tr]:hover:bg-mustard [&_tr_td]:px-2 [&_tr_td]:py-3">
          {event?.speakers && event.speakers.length > 0
            ? event?.speakers.map(({ speaker }) => (
                <SpeakerRow
                  key={speaker.id}
                  speaker={speaker}
                  variant="mustard"
                  size="sm"
                />
              ))
            : null}
          <TableRow>
            <TableCell className="flex flex-col gap-2">
              <h2 className={typefaceSubtitle()}>Summary</h2>
              <CardDescription>{event?.summary}</CardDescription>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="flex items-center gap-2">
              <h2 className={typefaceSubtitle()}>Location</h2>
              <Badge variant="mustard">{event?.location}</Badge>
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
        </TableBody>
      </Table>
    </PopoverContent>
  );
};
