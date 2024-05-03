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
import { type Block, type Event } from "@/server/db/schema";
import { DialogTitle } from "@/components/ui/dialog";

export const Agenda = async () => {
  const agenda = await api.block.getAll();
  const session = await auth();

  return (
    <div className="grid w-full gap-2">
      {agenda.length > 0 ? (
        agenda.map((block) => (
          <AgendaBlockMenu key={block.id} block={block}>
            <BlockCard type={block.type} />
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
  block: Block & { events: Event[] };
  children: ReactNode;
}> = async ({ block, children }) => {
  const session = await auth();

  const isAdmin = session?.user.role == "ADMIN";
  const withEvents = block.events.length > 0;

  return (
    <ContextMenu>
      <ContextMenuTrigger disabled={!session}>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuDialogItem triggerChildren="Edit">
          <DialogTitle>Edit Block</DialogTitle>
          <BlockForm start={block.start} editBlock={block} />
        </ContextMenuDialogItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>Event</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuDialogItem disabled={withEvents} triggerChildren="Add">
              Adding...
            </ContextMenuDialogItem>
            <ContextMenuDialogItem
              disabled={!withEvents}
              triggerChildren="Edit"
            >
              Editing...
            </ContextMenuDialogItem>
            <ContextMenuSeparator />
            <ContextMenuDialogItem
              disabled={!isAdmin}
              className="text-destructive"
              triggerChildren="Delete"
            >
              Deleting...
            </ContextMenuDialogItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSub>
          <ContextMenuSubTrigger disabled={!withEvents}>
            Speaker
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuDialogItem disabled={withEvents} triggerChildren="Add">
              Adding...
            </ContextMenuDialogItem>
            <ContextMenuDialogItem
              disabled={!withEvents}
              triggerChildren="Edit"
            >
              Editing...
            </ContextMenuDialogItem>
            <ContextMenuSeparator />
            <ContextMenuDialogItem
              disabled={!isAdmin}
              className="text-destructive"
              triggerChildren="Delete"
            >
              Deleting...
            </ContextMenuDialogItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuDialogItem
          disabled={!isAdmin}
          className="text-destructive"
          triggerChildren="Delete"
        >
          Deleting...
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
