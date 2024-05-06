import { BlockCard } from "@/components/organism/block_card/block_card";
import { typefaceTitle } from "@/components/typeface";
import { api } from "@/trpc/server";
import { AgendaBlockMenu } from "./agenda_block_menu";
import { AddBlockDialog } from "../../molecule/add_block_dialog/add_block_dialog";
import { Fragment } from "react";
import { formatDate, formatTimeWithMeridiem } from "@/lib/utils";

export const Agenda = async () => {
  const agenda = await api.block.getAgenda();
  return (
    <div className="grid w-full gap-2">
      {agenda.length > 0 ? (
        agenda.map((block, idx) => {
          const lastBlock = agenda.at(idx - 1);
          const isStartOfDay =
            block.start.getDay() !== lastBlock?.start.getDay();
          return (
            <Fragment key={block.id}>
              {isStartOfDay && (
                <div className="flex items-center gap-4">
                  <div className="h-3 grow bg-foreground sm:h-6" />
                  <p className={typefaceTitle("text-sm sm:text-md")}>
                    {formatDate(block.start)}
                  </p>
                  <div className="h-3 grow bg-foreground sm:h-6" />
                </div>
              )}
              <AgendaBlockMenu block={block}>
                <div className="grid grid-cols-[5rem_1fr] gap-2 sm:grid-cols-[10rem_1fr]">
                  <p className={typefaceTitle("text-sm sm:text-md")}>
                    {formatTimeWithMeridiem(block.start)}
                  </p>
                  <BlockCard block={block} />
                </div>
              </AgendaBlockMenu>
            </Fragment>
          );
        })
      ) : (
        <p className={typefaceTitle()}>Agenda has not be posted yet.</p>
      )}
      <AddBlockDialog lastTime={agenda.at(-1)?.end} />
    </div>
  );
};
