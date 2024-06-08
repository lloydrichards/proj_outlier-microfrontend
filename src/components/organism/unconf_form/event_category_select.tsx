"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/atom/form";
import { categoryEnum } from "@/server/db/schema";
import { type FC } from "react";
import { useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atom/select";
import { type UnconfSchema } from "./unconf_form";
import { useTranslations } from "next-intl";

export const EventCategorySelect: FC<{
  exclude?: string[];
}> = ({ exclude }) => {
  const form = useFormContext<UnconfSchema>();
  const t = useTranslations("Forms.Event.Category");
  const tCommon = useTranslations("Common");
  return (
    <FormField
      control={form.control}
      name="event.category"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t("title")}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={t("placeholder")} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {categoryEnum.enumValues
                .filter((e) => (exclude ? !exclude.includes(e) : true))
                .map((value) => (
                  <SelectItem key={value} value={value}>
                    {tCommon("category", { category: value })}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
