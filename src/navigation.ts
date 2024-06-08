import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { ALL_LOCALES } from "./lib/i18n";

export const localePrefix = "always"; // Default

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales: ALL_LOCALES, localePrefix });
