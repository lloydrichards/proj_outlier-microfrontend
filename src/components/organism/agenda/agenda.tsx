import { BlockCard } from "@/components/organism/block_card/block_card";
import { typefaceTitle } from "@/components/typeface";
import { api } from "@/trpc/server";
import { AgendaBlockMenu } from "./agenda_block_menu";
import { AddBlockDialog } from "../../molecule/add_block_dialog/add_block_dialog";
import { type FC, Fragment } from "react";
import { formatDate } from "@/lib/utils";
import { LocalTime } from "@/components/molecule/local_time/local_time";
import { TimeZone } from "@/components/molecule/time_zome/time_zome";

export const Agenda: FC<{ edition?: string; date?: Date }> = async ({
  edition = null,
  date = null,
}) => {
  const agenda = await api.block.getAgenda({ edition, date });
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
              {idx === 0 && <TimeZone />}
              <AgendaBlockMenu block={block}>
                <div className="grid grid-cols-[4rem_1fr] gap-2 sm:grid-cols-[8rem_1fr]">
                  <p className={typefaceTitle("text-sm sm:text-md")}>
                    <LocalTime date={block.start} />
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
