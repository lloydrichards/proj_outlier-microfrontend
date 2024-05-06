import { BlockForm } from "@/components/organism/block_form/block_form";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuDialogItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { auth } from "@/server/auth";
import { type FC, type ReactNode } from "react";
import { DialogTitle } from "@/components/ui/dialog";
import { EventForm } from "../event_form/event_form";
import { SpeakerForm } from "../speaker_form/speaker_form";
import { DeleteSpeakerDialog } from "./delete_speaker_dialog";
import { DeleteEventDialog } from "./delete_event_dialog";
import { DeleteBlockDialog } from "./delete_block_dialog";
import type { RouterOutput } from "@/trpc/react";

type BlockType = RouterOutput["block"]["getAll"][number];
type EventType = BlockType["events"][number];
type SpeakerType = EventType["speakers"][number];

export const AgendaBlockMenu: FC<{
  block: BlockType;
  children: ReactNode;
}> = async ({ block, children }) => {
  const session = await auth();

  const isAdmin = session?.user.role == "ADMIN";

  return (
    <ContextMenu>
      <ContextMenuTrigger disabled={!isAdmin}>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuDialogItem triggerChildren="Edit">
          <DialogTitle>Edit Block</DialogTitle>
          <BlockForm start={block.start} edit={block} />
        </ContextMenuDialogItem>
        <EventsContextSubMenu block={block} events={block.events} />
        <ContextMenuSeparator />
        <ContextMenuDialogItem
          className="text-destructive"
          triggerChildren="Delete"
        >
          <DeleteBlockDialog block={block} />
        </ContextMenuDialogItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

const EventsContextSubMenu: FC<{
  block: BlockType;
  events: EventType[];
}> = ({ block, events }) => {
  const withEvents = events.length > 0;
  return (
    <ContextMenuSub>
      <ContextMenuSubTrigger>Event</ContextMenuSubTrigger>
      <ContextMenuSubContent className="w-48">
        {events.map((event) => (
          <ContextMenuSub key={event.id}>
            <ContextMenuSubTrigger>{event.title}</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuDialogItem triggerChildren="Edit">
                <EventForm blockId={block.id} edit={event} />
              </ContextMenuDialogItem>
              <SpeakersContextSubMenu event={event} speakers={event.speakers} />
              <ContextMenuSeparator />
              <ContextMenuDialogItem
                className="text-destructive"
                triggerChildren="Delete"
              >
                <DeleteEventDialog event={event} />
              </ContextMenuDialogItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        ))}
        <ContextMenuDialogItem
          disabled={block.type != "UNCONF" && withEvents}
          triggerChildren="Add"
        >
          <EventForm blockId={block.id} />
        </ContextMenuDialogItem>
      </ContextMenuSubContent>
    </ContextMenuSub>
  );
};

const SpeakersContextSubMenu: FC<{
  event: EventType;
  speakers: SpeakerType[];
}> = ({ event, speakers }) => {
  return (
    <ContextMenuSub>
      <ContextMenuSubTrigger>Speakers</ContextMenuSubTrigger>
      <ContextMenuSubContent className="w-48">
        {speakers.map((speaker) => (
          <ContextMenuSub key={speaker.id}>
            <ContextMenuSubTrigger>{speaker.fullName}</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuDialogItem triggerChildren="Edit">
                <SpeakerForm eventId={event.id} edit={speaker} />
              </ContextMenuDialogItem>
              <ContextMenuSeparator />
              <ContextMenuDialogItem
                className="text-destructive"
                triggerChildren="Delete"
              >
                <DeleteSpeakerDialog speaker={speaker} />
              </ContextMenuDialogItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        ))}
        <ContextMenuDialogItem triggerChildren="Add">
          <SpeakerForm eventId={event.id} />
        </ContextMenuDialogItem>
      </ContextMenuSubContent>
    </ContextMenuSub>
  );
};
