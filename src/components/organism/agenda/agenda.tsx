import { BlockCard } from "@/components/organism/block_card/block_card";
import { typefaceTitle } from "@/components/typeface";
import { api } from "@/trpc/server";
import { AgendaBlockMenu } from "./agenda_block_menu";
import { AddBlockDialog } from "../../molecule/add_block_dialog/add_block_dialog";
import { type FC, Fragment } from "react";
import { LocalTime } from "@/components/molecule/local_time/local_time";
import { TimeZone } from "@/components/molecule/time_zone/time_zone";
import { DateLine } from "@/components/molecule/date_line/date_line";
import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import { cva } from "class-variance-authority";

const agendaBlockVariants = cva(
  "grid grid-cols-[4rem_1fr] gap-2 sm:grid-cols-[8rem_1fr]",
  {
    variants: {
      active: {
        true: "",
        false: "opacity-60 saturate-50",
      },
    },
    defaultVariants: {
      active: true,
    },
  },
);

type AgendaProps = {
  edition?: string;
  date?: Date;
  className?: string;
};
export const Agenda: FC<AgendaProps> = async ({
  edition = null,
  date = null,
  className,
}) => {
  const agenda = await api.block.getAgenda({ edition, date });
  const t = await getTranslations("Agenda");
  return (
    <article className={cn("grid w-full gap-2", className)}>
      {agenda.length > 0 ? (
        agenda.map((block, idx) => {
          const lastBlock = agenda.at(idx - 1);
          const isStartOfDay =
            block.start.getDay() !== lastBlock?.start.getDay();
          const isUpcoming = block.end.getTime() > new Date().getTime();
          return (
            <Fragment key={block.id}>
              {isStartOfDay && <DateLine date={block.start} />}
              {idx === 0 && <TimeZone />}
              <AgendaBlockMenu block={block}>
                <div
                  className={agendaBlockVariants({
                    active: isUpcoming,
                  })}
                >
                  <span className={typefaceTitle("text-sm sm:text-md")}>
                    <LocalTime date={block.start} />
                  </span>
                  <BlockCard block={block} />
                </div>
              </AgendaBlockMenu>
            </Fragment>
          );
        })
      ) : (
        <p className={typefaceTitle()}>{t("empty_failure")}</p>
      )}
      <AddBlockDialog lastTime={agenda.at(-1)?.end} />
    </article>
  );
};
