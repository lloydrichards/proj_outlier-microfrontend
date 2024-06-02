"use client";

import { typefaceTitle } from "@/components/typeface";
import { useHydration } from "@/hooks/use-hydration";
import { useFormatter } from "next-intl";
import { Suspense } from "react";

export function LocalTime({ date }: { date: Date | string | number }) {
  const isHydrated = useHydration();
  const format = useFormatter();

  return (
    <p className={typefaceTitle("text-sm sm:text-md")}>
      <Suspense>
        <time dateTime={new Date(date).toISOString()}>
          {isHydrated &&
            format.dateTime(new Date(date), {
              hour: "numeric",
              minute: "numeric",
            })}
        </time>
      </Suspense>
    </p>
  );
}
