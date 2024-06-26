import type { FC } from "react";
import { CardDescription, CardTitle } from "@/components/atom/card";
import { typefaceSubtitle } from "../../typeface";
import type { AgendaEvent } from "../block_card/block_card";
import { Table, TableBody, TableCell, TableRow } from "@/components/atom/table";
import { Badge } from "@/components/atom/badge";
import { PopoverContent } from "@/components/atom/popover";
import { SpeakerRow } from "@/components/molecule/speaker_row/speaker_row";
import { useTranslations } from "next-intl";

export const LightningPopoverContent: FC<{ event?: AgendaEvent }> = ({
  event,
}) => {
  const t = useTranslations("Popover");
  const tCommon = useTranslations("Common");

  return (
    <PopoverContent className="w-[var(--radix-popover-trigger-width)] border-none bg-turquoise text-turquoise-foreground shadow-2xl">
      <Table>
        <TableBody className="[&_tr]:border-turquoise-foreground [&_tr]:hover:bg-turquoise [&_tr_td]:px-2 [&_tr_td]:py-3">
          <TableRow>
            <TableCell className="flex flex-col gap-2">
              <h2 className={typefaceSubtitle()}>{t("title_section")}</h2>
              <CardTitle className="line-clamp-none">{event?.title}</CardTitle>
            </TableCell>
          </TableRow>
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
              <h2 className={typefaceSubtitle("whitespace-pre-wrap")}>
                {t("description_section")}
              </h2>
              <CardDescription>{event?.description}</CardDescription>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="flex items-center gap-2">
              <h2 className={typefaceSubtitle()}>{t("category_section")}</h2>
              <Badge variant="turquoise">
                {tCommon("category", { category: event?.category })}
              </Badge>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="flex items-center gap-2">
              <h2 className={typefaceSubtitle()}>{t("location_section")}</h2>
              <Badge variant="turquoise">
                {tCommon("location", { location: event?.location })}
              </Badge>
            </TableCell>
          </TableRow>
          {event?.linkLabel && event.linkUrl ? (
            <TableRow>
              <TableCell className="flex flex-col gap-2">
                <h2 className={typefaceSubtitle()}>{t("link_section")}</h2>
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
