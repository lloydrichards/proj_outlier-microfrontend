"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/atom/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atom/select";
import { locationEnum, type InsertEventSchema } from "@/server/db/schema";
import { useTranslations } from "next-intl";
import { type FC } from "react";
import { useFormContext } from "react-hook-form";

export const EventLocationSelect: FC = () => {
  const form = useFormContext<InsertEventSchema>();
  const tCommon = useTranslations("Common");
  const t = useTranslations("Forms.Event.Location");
  return (
    <FormField
      control={form.control}
      name="location"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t("label")}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={t("helper")} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {locationEnum.enumValues.map((value) => (
                <SelectItem key={value} value={value}>
                  {tCommon("location", { location: value })}
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
