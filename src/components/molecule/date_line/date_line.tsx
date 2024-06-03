import { typefaceTitle } from "@/components/typeface";
import { formatDate } from "@/lib/utils";

export const DateLine = ({ date }: { date: Date }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="h-3 grow bg-foreground sm:h-6" />
      <p className={typefaceTitle("text-sm sm:text-md")}>{formatDate(date)}</p>
      <div className="h-3 grow bg-foreground sm:h-6" />
    </div>
  );
};
