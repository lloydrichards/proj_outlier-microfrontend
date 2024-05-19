import type { FC } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atom/card";
import type { AgendaEvent } from "../block_card/block_card";
import { Badge } from "@/components/atom/badge";
import { Popover, PopoverTrigger } from "@/components/atom/popover";
import { UnconfPopoverContent } from "./unconf_popover_content";

export const UnconfCard: FC<{ event: AgendaEvent }> = ({ event }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Card
          key={event.id}
          variant="mustard"
          className="h-full w-1/2 min-w-96 text-left"
        >
          <CardHeader>
            <CardTitle className="line-clamp-1">{event.title}</CardTitle>
            <CardDescription className="line-clamp-3">
              {event.summary}
            </CardDescription>
            <CardDescription>
              Organized by:
              {event.speakers
                .map(({ speaker }) =>
                  speaker.fullName + speaker.pronouns
                    ? ` (${speaker.pronouns})`
                    : "",
                )
                .join(", ")}
            </CardDescription>
            <Badge variant="mustard" className={"absolute right-2 top-2"}>
              {event.category}
            </Badge>
            <Badge
              variant="mustard"
              className={"absolute bottom-2 left-2 opacity-50"}
            >
              {event.status == "PENDING" ? event.status : event.location}
            </Badge>
          </CardHeader>
        </Card>
      </PopoverTrigger>
      <UnconfPopoverContent event={event} />
    </Popover>
  );
};
