import type { FC } from "react";
import { CardDescription, CardTitle } from "@/components/atom/card";
import { typefaceSubtitle } from "../../typeface";
import type { AgendaBlock, AgendaEvent } from "../block_card/block_card";
import { Badge } from "@/components/atom/badge";
import { Table, TableBody, TableCell, TableRow } from "@/components/atom/table";
import { PopoverContent } from "@/components/atom/popover";
import { SpeakerRow } from "@/components/molecule/speaker_row/speaker_row";
import { useTranslations } from "next-intl";
import { formatDate } from "@/lib/utils";
import { LocalTime } from "@/components/molecule/local_time/local_time";

export const SpeakerPopoverContent: FC<{
  event?: AgendaEvent;
  block: AgendaBlock;
}> = ({ event, block }) => {
  const tCard = useTranslations("Popover");
  const tCommon = useTranslations("Common");
  return (
    <PopoverContent className="w-[var(--radix-popover-trigger-width)] border-none bg-plum text-plum-foreground shadow-2xl">
      <Table>
        <TableBody className="[&_tr]:border-plum-foreground [&_tr]:hover:bg-plum [&_tr_td]:px-2 [&_tr_td]:py-3">
          <TableRow>
            <TableCell className="flex flex-col gap-2">
              <h2 className={typefaceSubtitle()}>{tCard("title_section")}</h2>
              <CardTitle className="line-clamp-none">{event?.title}</CardTitle>
            </TableCell>
          </TableRow>
          {event?.speakers && event.speakers.length > 0
            ? event?.speakers.map(({ speaker }) => (
                <SpeakerRow key={speaker.id} speaker={speaker} variant="plum" />
              ))
            : null}
          <TableRow>
            <TableCell className="flex flex-col gap-2">
              <h2 className={typefaceSubtitle("whitespace-pre-wrap")}>
                {tCard("description_section")}
              </h2>
              <CardDescription>{event?.description}</CardDescription>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="flex items-center gap-2">
              <h2 className={typefaceSubtitle()}>
                {tCard("location_section")}
              </h2>
              <Badge variant="plum">
                {tCommon("location", { location: event?.location })}
              </Badge>
            </TableCell>
          </TableRow>
          {event?.linkLabel && event.linkUrl ? (
            <TableRow>
              <TableCell className="flex flex-col gap-2">
                <h2 className={typefaceSubtitle()}>{tCard("link_section")}</h2>
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
              <h2 className={typefaceSubtitle()}>{tCard("date_section")}</h2>
              <CardDescription>{formatDate(block.start)}</CardDescription>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="flex items-center gap-2">
              <h2 className={typefaceSubtitle()}>{tCard("time_section")}</h2>
              <CardDescription>
                <LocalTime date={block.start} /> &#8594;{" "}
                <LocalTime date={block.end} /> (
                {tCommon("timeInMin", { count: block.duration })})
              </CardDescription>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </PopoverContent>
  );
};
