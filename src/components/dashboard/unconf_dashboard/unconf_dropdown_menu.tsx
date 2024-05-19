"use client";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/atom/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuDialogItem,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/atom/dropdown-menu";
import { type FC } from "react";
import { type RouterOutput, api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { EventForm } from "@/components/organism/event_form/event_form";

export const UnconfDropdownMenu: FC<{
  event: RouterOutput["unconf"]["getUnconfEvents"][number];
  isAdmin: boolean;
}> = ({ event, isAdmin }) => {
  const router = useRouter();
  const accept = api.unconf.accept.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });
  const reject = api.unconf.reject.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });
  const deleteEvent = api.event.delete.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-haspopup="true" size="icon" variant="ghost">
          <MoreHorizontal className="size-4" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Decision?</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => accept.mutate(event)}>
          Accept
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => reject.mutate(event)}>
          Reject
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuDialogItem triggerChildren="Edit">
          <EventForm blockId={event.blockId} edit={event} />
        </DropdownMenuDialogItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={!isAdmin}
          className="text-destructive"
          onClick={() => deleteEvent.mutate(event)}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
