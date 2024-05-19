import type { FC } from "react";
import { CardDescription } from "../../ui/card";
import { typefaceSubtitle } from "../../typeface";
import type { AgendaEvent } from "../block_card/block_card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PopoverContent } from "@/components/ui/popover";
import { SpeakerRow } from "@/components/molecule/speaker_row/speaker_row";

export const LightningPopoverContent: FC<{ event?: AgendaEvent }> = ({
  event,
}) => {
  return (
    <PopoverContent className="w-[var(--radix-popover-trigger-width)] border-none bg-turquoise text-turquoise-foreground shadow-2xl">
      <Table>
        <TableBody className="[&_tr]:border-turquoise-foreground [&_tr]:hover:bg-turquoise [&_tr_td]:px-2 [&_tr_td]:py-3">
          {event?.speakers && event.speakers.length > 0
            ? event?.speakers.map(({ speaker }) => (
                <SpeakerRow
                  key={speaker.id}
                  speaker={speaker}
                  variant="turquoise"
                />
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
              <h2 className={typefaceSubtitle()}>Category</h2>
              <Badge variant="turquoise">{event?.category}</Badge>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="flex items-center gap-2">
              <h2 className={typefaceSubtitle()}>Location</h2>
              <Badge variant="turquoise">{event?.location}</Badge>
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
