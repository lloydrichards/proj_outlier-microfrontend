import { Agenda } from "@/components/organism/agenda/agenda";

const DateEmbedded = async ({
  searchParams,
}: {
  searchParams: { date?: string };
}) => {
  const queryDate = searchParams.date ? new Date(searchParams.date) : undefined;
  return <Agenda date={queryDate} />;
};

export default DateEmbedded;
