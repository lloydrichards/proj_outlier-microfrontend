"use client";

import { useHydration } from "@/hooks/use-hydration";
import { formatTimeWithMeridiem } from "@/lib/utils";
import { Suspense } from "react";

export function LocalTime({ date }: { date: Date | string | number }) {
  const isHydrated = useHydration();

  return (
    <Suspense>
      <time dateTime={new Date(date).toISOString()}>
        {isHydrated && formatTimeWithMeridiem(new Date(date))}
      </time>
    </Suspense>
  );
}
