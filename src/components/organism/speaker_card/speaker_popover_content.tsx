import type { FC } from "react";
import { CardDescription } from "@/components/atom/card";
import { typefaceSubtitle } from "../../typeface";
import type { AgendaBlock, AgendaEvent } from "../block_card/block_card";
import { Badge } from "@/components/atom/badge";
import { Table, TableBody, TableCell, TableRow } from "@/components/atom/table";
import { PopoverContent } from "@/components/atom/popover";
import { SpeakerRow } from "@/components/molecule/speaker_row/speaker_row";
import { useFormatter, useTranslations } from "next-intl";

export const SpeakerPopoverContent: FC<{
  event?: AgendaEvent;
  block: AgendaBlock;
}> = ({ event, block }) => {
  const format = useFormatter();
  const tCard = useTranslations("Popover");
  const tCommon = useTranslations("Common");
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
              <h2 className={typefaceSubtitle()}>
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
              <CardDescription>
                {format.dateTime(block.start, {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </CardDescription>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="flex items-center gap-2">
              <h2 className={typefaceSubtitle()}>{tCard("time_section")}</h2>
              <CardDescription>
                {format.dateTime(block.start, {
                  hour: "numeric",
                  minute: "numeric",
                })}{" "}
                &#8594;{" "}
                {format.dateTime(block.end, {
                  hour: "numeric",
                  minute: "numeric",
                })}{" "}
                ({tCommon("timeInMin", { count: block.duration })})
              </CardDescription>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </PopoverContent>
  );
};
