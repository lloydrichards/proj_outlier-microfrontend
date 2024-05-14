import type { FC } from "react";
import { Card, CardDescription, CardHeader } from "../../ui/card";
import { typefaceMeta, typefaceSubtitle } from "../../typeface";
import type { BlockCardProps } from "./block_card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export const LightningCard: FC<BlockCardProps> = ({ block, className }) => {
  if (block.events.length == 0) {
    return (
      <Card variant="turquoise" className={className}>
        <CardHeader>
          <span className={typefaceSubtitle()}>LIGHTNING</span>
          <CardDescription>Nothing scheduled</CardDescription>
        </CardHeader>
        <p className={typefaceMeta("absolute bottom-4 right-4 opacity-40")}>
          {block.duration} min
        </p>
      </Card>
    );
  }

  const event = block.events.at(0);
  const speaker = event?.speakers.at(0)?.speaker;

  return (
    <Popover>
      <PopoverTrigger>
        <Card variant="turquoise" className={cn("text-left", className)}>
          <CardHeader>
            <span className={typefaceSubtitle()}>LIGHTNING</span>
            <CardDescription className="line-clamp-1">
              <strong>{event?.title} -</strong> {speaker?.fullName}{" "}
              {speaker?.pronouns ? `(${speaker.pronouns})` : ""}
            </CardDescription>
          </CardHeader>

          <p className={typefaceMeta("absolute bottom-4 right-4 opacity-40")}>
            {block.duration} min
          </p>
        </Card>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] border-none bg-turquoise text-turquoise-foreground shadow-2xl">
        <Table>
          <TableBody className="[&_tr]:border-turquoise-foreground [&_tr]:hover:bg-turquoise [&_tr_td]:px-2 [&_tr_td]:py-3">
            {event?.speakers && event.speakers.length > 0 ? (
              <>
                <TableRow>
                  <TableCell className="flex flex-col gap-2">
                    <h2 className={typefaceSubtitle()}>Speaker</h2>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <Avatar className="size-10 border-2 border-turquoise-foreground bg-turquoise-foreground/90 md:size-16">
                          <AvatarImage src={speaker?.imageUrl ?? undefined} />
                          <AvatarFallback className="bg-turquoise-foreground text-turquoise">
                            {speaker?.firstName[0]}
                            {speaker?.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col justify-center gap-1">
                          <CardDescription className="opacity-60">
                            {speaker?.fullName}{" "}
                            {speaker?.pronouns ? `(${speaker?.pronouns})` : ""}
                          </CardDescription>
                          <CardDescription>
                            {speaker?.title} - {speaker?.organization}
                          </CardDescription>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              </>
            ) : null}
            <TableRow>
              <TableCell className="flex flex-col gap-2">
                <h2 className={typefaceSubtitle()}>Description</h2>
                <CardDescription>{event?.description}</CardDescription>
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
    </Popover>
  );
};
