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
import { cn, formatDate, formatTime } from "@/lib/utils";
import { type FC } from "react";
import { getTranslations } from "next-intl/server";

export const UnconfDashboard: FC<{ edition?: string }> = async ({
  edition,
}) => {
  const session = await auth();
  const t = await getTranslations("Dashboard.Unconf.Table");
  const tCommon = await getTranslations("Common");
  const unconfEvents = await api.unconf.getUnconfEvents({ edition });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t("block_time")}</TableHead>
          <TableHead>{t("label")}</TableHead>
          <TableHead>{t("summary")}</TableHead>
          <TableHead>{t("description")}</TableHead>
          <TableHead>{t("organizer")}</TableHead>
          <TableHead>{t("email")}</TableHead>
          <TableHead>{t("location")}</TableHead>
          <TableHead>{t("status")}</TableHead>
          <TableHead>
            <span className="sr-only">{t("action")}</span>
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
                {formatDate(event.block.start)}
                <br />
                {formatTime(event.block.start)}
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
              <TableCell className={cn("w-80 whitespace-pre-wrap")}>
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
                  {tCommon("location", { location: event.location })}
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
                  {tCommon("status", { status: event.status })}
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
