import { typefaceSubtitle } from "@/components/typeface";
import { auth } from "@/server/auth";
import { api } from "@/trpc/server";
import { Badge } from "@/components/atom/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/atom/table";
import { UnconfDropdownMenu } from "./unconf_dropdown_menu";
import { cn } from "@/lib/utils";
import { type FC } from "react";
import { useFormatter, useTranslations } from "next-intl";

export const UnconfDashboard: FC<{ edition?: string }> = async ({
  edition,
}) => {
  const session = await auth();
  const format = useFormatter();
  const t = useTranslations("Common");
  const unconfEvents = await api.unconf.getUnconfEvents({ edition });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Block Time</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Summary</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Organizer</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {unconfEvents
          .sort((a, b) => a.block.start.getTime() - b.block.start.getTime())
          .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
          .map((event) => (
            <TableRow
              key={event.id}
              className={cn(
                event.status == "REJECTED" ? "bg-foreground/10 opacity-30" : "",
                event.status == "ACCEPTED" ? "bg-foreground/10" : "",
              )}
            >
              <TableCell className={typefaceSubtitle("w-40")}>
                {format.dateTime(event.block.start, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell className="w-40">{event.title}</TableCell>
              <TableCell
                className={cn(
                  "w-80 whitespace-pre-wrap",
                  event.status == "REJECTED" ? "line-clamp-1" : "",
                )}
              >
                {event.summary}
              </TableCell>
              <TableCell
                className={cn(
                  "w-80 whitespace-pre-wrap",
                  event.status == "REJECTED" ? "line-clamp-1" : "",
                )}
              >
                {event.description}
              </TableCell>
              <TableCell>
                {event.speakers.map(({ speaker }) => (
                  <p key={speaker.id}>{speaker.fullName}</p>
                ))}
              </TableCell>
              <TableCell>{event.speakers.at(0)?.speaker?.email}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    event.status != "REJECTED" && event.location == "UNASSIGNED"
                      ? "mustard"
                      : "default"
                  }
                >
                  {t("location", { location: event.location })}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    event.status == "ACCEPTED"
                      ? "plum"
                      : event.status == "PENDING"
                        ? "mustard"
                        : "default"
                  }
                >
                  {event.status}
                </Badge>
              </TableCell>

              <TableCell>
                <UnconfDropdownMenu
                  event={event}
                  isAdmin={session?.user.role == "ADMIN"}
                />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};
