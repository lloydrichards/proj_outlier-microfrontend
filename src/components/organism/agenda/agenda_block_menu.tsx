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
} from "@/components/atom/context-menu";
import { auth } from "@/server/auth";
import { type FC, type ReactNode } from "react";
import { DialogTitle } from "@/components/atom/dialog";
import { EventForm } from "../event_form/event_form";
import { SpeakerForm } from "../speaker_form/speaker_form";
import { DeleteSpeakerDialog } from "./delete_speaker_dialog";
import { DeleteEventDialog } from "./delete_event_dialog";
import { DeleteBlockDialog } from "./delete_block_dialog";
import type { RouterOutput } from "@/trpc/react";
import { getTranslations } from "next-intl/server";

type BlockType = RouterOutput["block"]["getAgenda"][number];
type EventType = BlockType["events"][number];
type SpeakerType = EventType["speakers"][number];

export const AgendaBlockMenu: FC<{
  block: BlockType;
  children: ReactNode;
}> = async ({ block, children }) => {
  const session = await auth();
  const t = await getTranslations("Menu");
  const isAdmin = session?.user.role == "ADMIN";

  return (
    <ContextMenu>
      <ContextMenuTrigger disabled={!isAdmin}>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuDialogItem triggerChildren={t("edit_btn")}>
          <DialogTitle>{t("Speaker.edit_section")}</DialogTitle>
          <BlockForm start={block.start} edit={block} />
        </ContextMenuDialogItem>
        <EventsContextSubMenu block={block} events={block.events} />
        <ContextMenuSeparator />
        <ContextMenuDialogItem
          className="text-destructive"
          triggerChildren={t("delete_btn")}
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
}> = async ({ block, events }) => {
  const t = await getTranslations("Menu");

  const withEvents = events.length > 0;
  return (
    <ContextMenuSub>
      <ContextMenuSubTrigger>{t("Event.label")}</ContextMenuSubTrigger>
      <ContextMenuSubContent className="w-48">
        {events.map((event) => (
          <ContextMenuSub key={event.id}>
            <ContextMenuSubTrigger>{event.title}</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuDialogItem triggerChildren={t("edit_btn")}>
                <EventForm blockId={block.id} edit={event} />
              </ContextMenuDialogItem>
              <SpeakersContextSubMenu event={event} speakers={event.speakers} />
              <ContextMenuSeparator />
              <ContextMenuDialogItem
                className="text-destructive"
                triggerChildren={t("delete_btn")}
              >
                <DeleteEventDialog event={event} />
              </ContextMenuDialogItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        ))}
        <ContextMenuDialogItem
          disabled={block.type != "UNCONF" && withEvents}
          triggerChildren={t("add_btn")}
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
}> = async ({ event, speakers }) => {
  const t = await getTranslations("Menu");
  return (
    <ContextMenuSub>
      <ContextMenuSubTrigger>{t("Speaker.label")}</ContextMenuSubTrigger>
      <ContextMenuSubContent className="w-48">
        {speakers.map(({ speaker }) => (
          <ContextMenuSub key={speaker.id}>
            <ContextMenuSubTrigger>{speaker.fullName}</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuDialogItem triggerChildren={t("edit_btn")}>
                <SpeakerForm eventId={event.id} edit={speaker} />
              </ContextMenuDialogItem>
              <ContextMenuSeparator />
              <ContextMenuDialogItem
                className="text-destructive"
                triggerChildren={t("delete_btn")}
              >
                <DeleteSpeakerDialog speaker={speaker} />
              </ContextMenuDialogItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        ))}
        <ContextMenuDialogItem triggerChildren={t("add_btn")}>
          <SpeakerForm eventId={event.id} />
        </ContextMenuDialogItem>
      </ContextMenuSubContent>
    </ContextMenuSub>
  );
};
