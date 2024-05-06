"use client";

import { useHydration } from "@/hooks/use-hydration";
import { timeFormat } from "d3-time-format";
import { Suspense } from "react";

export function LocalTime({ date }: { date: Date | string | number }) {
  const hydrated = useHydration();
  const format = timeFormat("%I:%M %p");

  return (
    <Suspense>
      <time dateTime={new Date(date).toISOString()}>
        {format(new Date(date))}
        {hydrated ? "" : " (UTC)"}
      </time>
    </Suspense>
  );
}
