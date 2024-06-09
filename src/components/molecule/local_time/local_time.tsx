"use client";

import { useHydration } from "@/hooks/use-hydration";
import { useFormatter } from "next-intl";
import { Suspense } from "react";

export function LocalTime({ date }: { date: Date | string | number }) {
  const isHydrated = useHydration();
  const format = useFormatter();

  return (
    <Suspense>
      <time dateTime={new Date(date).toISOString()}>
        {isHydrated &&
          format.dateTime(new Date(date), {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          })}
      </time>
    </Suspense>
  );
}
