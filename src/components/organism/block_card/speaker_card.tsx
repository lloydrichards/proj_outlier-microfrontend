import type { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { typefaceBody, typefaceMeta, typefaceSubtitle } from "../../typeface";
import type { BlockCardProps } from "./block_card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";

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
    <HoverCard>
      <HoverCardTrigger>
        <Card variant="plum" className={className}>
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
                className="size-32 opacity-20 saturate-0"
              >
                <AvatarImage src={speaker.imageUrl ?? undefined} />
                <AvatarFallback>
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
      </HoverCardTrigger>
      <HoverCardContent className="bg-plum text-plum-foreground">
        <Table>
          <TableBody className="[&_tr]:border-plum-foreground [&_tr]:hover:bg-plum [&_tr_td:first-child]:w-20">
            <TableRow>
              <TableCell className={typefaceSubtitle()}>Description</TableCell>
              <TableCell className={typefaceBody()}>
                {event?.description}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={typefaceSubtitle()}>Location</TableCell>
              <TableCell className={typefaceBody()}>
                {event?.location}
              </TableCell>
            </TableRow>
            {event?.linkLabel && event.linkUrl ? (
              <TableRow>
                <TableCell className={typefaceSubtitle()}>Link</TableCell>
                <TableCell className={typefaceBody()}>
                  <a href={event.linkUrl} target="_blank">
                    {event.linkLabel}
                  </a>
                </TableCell>
              </TableRow>
            ) : null}
            {event?.speakers && event.speakers.length > 0
              ? event.speakers.map(({ speaker }) => (
                  <TableRow key={speaker.id}>
                    <TableCell className="w-fit"></TableCell>
                    <TableCell className={typefaceBody()}>
                      <div className="flex items-center gap-2">
                        <Avatar className="size-8 border border-plum-foreground">
                          <AvatarImage src={speaker.imageUrl ?? undefined} />
                          <AvatarFallback>
                            {speaker.firstName[0]}
                            {speaker.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        {speaker.fullName}{" "}
                        {speaker.pronouns ? `(${speaker.pronouns})` : ""}
                      </div>
                      <CardDescription>
                        {speaker.title} - {speaker.organization}
                      </CardDescription>
                      <CardDescription>{speaker.bio}</CardDescription>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </HoverCardContent>
    </HoverCard>
  );
};
