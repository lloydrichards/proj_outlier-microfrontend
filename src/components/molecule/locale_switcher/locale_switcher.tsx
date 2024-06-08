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
import { useRouter } from "@/navigation";

export const LocaleSwitcher = () => {
  const t = useTranslations("i18n");
  const locale = useLocale();
  const router = useRouter();
  return (
    <Select
      value={locale}
      onValueChange={(e) => {
        router.replace("/", { locale: e });
      }}
    >
      <SelectTrigger className="w-32">
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
