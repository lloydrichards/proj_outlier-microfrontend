import { LocaleSwitcher } from "@/components/molecule/locale_switcher/locale_switcher";
import { Agenda } from "@/components/organism/agenda/agenda";

const DateEmbedded = async ({
  searchParams,
}: {
  searchParams: { date?: string };
}) => {
  const queryDate = searchParams.date ? new Date(searchParams.date) : undefined;
  return (
    <>
      <Agenda date={queryDate} showOngoing />
      <LocaleSwitcher className="sticky bottom-2 left-1 opacity-80" />
    </>
  );
};

export default DateEmbedded;
