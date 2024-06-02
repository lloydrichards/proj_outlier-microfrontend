/* eslint-disable @typescript-eslint/no-empty-interface */
import type de from "./messages/en.json";

type Messages = typeof de;

declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}
}
