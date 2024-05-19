import { typefaceSubtitle } from "@/components/typeface";
import { auth } from "@/server/auth";
import { api } from "@/trpc/server";

import { Badge } from "@/components/atom/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atom/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/atom/table";
import { UnconfDropdownMenu } from "./unconf_dropdown_menu";
import { cn, formatDate } from "@/lib/utils";
import { Header } from "@/components/organism/header/header";

export const metadata = {
  title: "Unconf Dashboard",
  description: "Manage unconf events and view their status",
};

export default async function Home() {
  const session = await auth();
  const unconfEvents = await api.unconf.getUnconfEvents();
  return (
    <main className="p-4">
      <Header />
      <Card>
        <CardHeader>
          <CardTitle>Pending Unconf Events</CardTitle>
          <CardDescription>
            Manage your products and view their sales performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                .sort(
                  (a, b) => a.block.start.getTime() - b.block.start.getTime(),
                )
                .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
                .map((event) => (
                  <TableRow
                    key={event.id}
                    className={cn(
                      event.status == "REJECTED"
                        ? "bg-foreground/10 opacity-30"
                        : "",
                      event.status == "ACCEPTED" ? "bg-foreground/10" : "",
                    )}
                  >
                    <TableCell className={typefaceSubtitle("w-40")}>
                      {formatDate(event.block.start)}
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
                    <TableCell>
                      {event.speakers.at(0)?.speaker?.email}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          event.status != "REJECTED" &&
                          event.location == "UNASSIGNED"
                            ? "mustard"
                            : "default"
                        }
                      >
                        {event.location}
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
        </CardContent>
      </Card>
    </main>
  );
}
