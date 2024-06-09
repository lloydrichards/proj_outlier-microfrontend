"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atom/select";
import { ALL_LOCALES } from "@/lib/i18n";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/navigation";
import { cn } from "@/lib/utils";
import { startTransition } from "react";

export const LocaleSwitcher = ({ className }: { className?: string }) => {
  const t = useTranslations("i18n");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Select
      value={locale}
      onValueChange={(e) => {
        startTransition(() => {
          router.replace(pathname, { locale: e });
        });
      }}
    >
      <SelectTrigger className={cn("w-32", className)}>
        <SelectValue placeholder="Select locale" />
      </SelectTrigger>
      <SelectContent>
        {ALL_LOCALES.map((locale) => (
          <SelectItem key={locale} value={locale}>
            {t("languageSelect", { locale })}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
