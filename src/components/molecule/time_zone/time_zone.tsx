"use client";

import { typefaceSubtitle } from "@/components/typeface";
import { useLocale } from "next-intl";

export const TimeZone = () => {
  const locale = useLocale();
  return (
    <p className={typefaceSubtitle()}>
      {Intl.DateTimeFormat(locale).resolvedOptions().timeZone}
    </p>
  );
};
