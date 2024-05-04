import { BlockCard } from "@/components/organism/block_card/block_card";
import { BlockForm } from "@/components/organism/block_form/block_form";
import { typefaceTitle } from "@/components/typeface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { api } from "@/trpc/server";
import { type FC, type ReactNode } from "react";
import { type Speaker, type Block, type Event } from "@/server/db/schema";
import { DialogTitle } from "@/components/ui/dialog";
import { EventForm } from "../event_form/event_form";
import { SpeakerForm } from "../speaker_form/speaker_form";
import { DeleteSpeakerDialog } from "./delete_speaker_dialog";
import { DeleteEventDialog } from "./delete_event_dialog";
import { DeleteBlockDialog } from "./delete_block_dialog";

export const Agenda = async () => {
  const agenda = await api.block.getAll();
  const session = await auth();

  return (
    <div className="grid w-full gap-2">
      {agenda.length > 0 ? (
        agenda.map((block) => (
          <AgendaBlockMenu key={block.id} block={block}>
            <BlockCard block={block} />
          </AgendaBlockMenu>
        ))
      ) : (
        <p className={typefaceTitle()}>Agenda has not be posted yet.</p>
      )}
      {session ? <AddBlockCard lastTime={agenda.at(-1)?.end} /> : null}
    </div>
  );
};

const AgendaBlockMenu: FC<{
  block: Block & { events: Array<Event & { speakers: Speaker[] }> };
  children: ReactNode;
}> = async ({ block, children }) => {
  const session = await auth();

  const isAdmin = session?.user.role == "ADMIN";
  const withEvents = block.events.length > 0;

  return (
    <ContextMenu>
      <ContextMenuTrigger disabled={!isAdmin}>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuDialogItem triggerChildren="Edit">
          <DialogTitle>Edit Block</DialogTitle>
          <BlockForm start={block.start} edit={block} />
        </ContextMenuDialogItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>Event</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            {block.events.map((event) => (
              <ContextMenuSub key={event.id}>
                <ContextMenuSubTrigger>{event.title}</ContextMenuSubTrigger>
                <ContextMenuSubContent className="w-48">
                  <ContextMenuDialogItem triggerChildren="Edit">
                    <EventForm blockId={block.id} edit={event} />
                  </ContextMenuDialogItem>
                  <ContextMenuSub>
                    <ContextMenuSubTrigger>Speakers</ContextMenuSubTrigger>
                    <ContextMenuSubContent className="w-48">
                      {event.speakers.map((speaker) => (
                        <ContextMenuSub key={speaker.id}>
                          <ContextMenuSubTrigger>
                            {speaker.first_name} {speaker.last_name}
                          </ContextMenuSubTrigger>
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

const AddBlockCard: FC<{ lastTime?: Date }> = ({ lastTime }) => {
  return (
    <Card className="border border-input">
      <CardHeader>
        <CardTitle>Add a new block</CardTitle>
      </CardHeader>
      <CardContent>
        <BlockForm start={lastTime ?? new Date()} />
      </CardContent>
    </Card>
  );
};
