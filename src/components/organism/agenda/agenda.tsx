import { BlockCard } from "@/components/organism/block_card/block_card";
import { typefaceTitle } from "@/components/typeface";
import { api } from "@/trpc/server";
import { AgendaBlockMenu } from "./agenda_block_menu";
import { AddBlockDialog } from "../../molecule/add_block_dialog/add_block_dialog";

export const Agenda = async () => {
  const agenda = await api.block.getAll();

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
      <AddBlockDialog lastTime={agenda.at(-1)?.end} />
    </div>
  );
};
