"use client";

import { useHydration } from "@/hooks/use-hydration";
import { timeFormat } from "d3-time-format";
import { Suspense } from "react";

export function LocalTime({ date }: { date: Date | string | number }) {
  const isHydrated = useHydration();
  const format = timeFormat("%I:%M %p");

  return (
    <Suspense>
      <time dateTime={new Date(date).toISOString()}>
        {isHydrated && format(new Date(date))}
      </time>
    </Suspense>
  );
}
