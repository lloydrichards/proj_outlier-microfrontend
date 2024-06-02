import { typefaceTitle } from "@/components/typeface";
import { useFormatter } from "next-intl";

export const DateLine = ({ date }: { date: Date }) => {
  const format = useFormatter();
  return (
    <div className="flex items-center gap-4">
      <div className="h-3 grow bg-foreground sm:h-6" />
      <p className={typefaceTitle("text-sm sm:text-md")}>
        {format.dateTime(date, {
          weekday: "short",
          month: "short",
          day: "numeric",
        })}
      </p>
      <div className="h-3 grow bg-foreground sm:h-6" />
    </div>
  );
};
