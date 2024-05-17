"use client";

import { typefaceSubtitle } from "@/components/typeface";

export const TimeZone = () => {
    return <p className={typefaceSubtitle()}>
    {Intl.DateTimeFormat().resolvedOptions().timeZone}
  </p>;
    }