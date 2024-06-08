/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export type Locale = "en" | "de";

export const ALL_LOCALES: Locale[] = ["en", "de"];

export default getRequestConfig(async ({ locale }) => {
  if (!ALL_LOCALES.includes(locale as Locale)) return notFound();
  return {
    messages: (await import(`../../messages/${locale}.json`))
      .default as IntlMessages,
  };
});
