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
import { categoryEnum, type InsertEventSchema } from "@/server/db/schema";
import { useTranslations } from "next-intl";
import { type FC } from "react";
import { useFormContext } from "react-hook-form";

export const EventCategorySelect: FC<{
  exclude?: string[];
}> = ({ exclude }) => {
  const form = useFormContext<InsertEventSchema>();
  const t = useTranslations("Common");
  return (
    <FormField
      control={form.control}
      name="category"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Category</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select category of event" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {categoryEnum.enumValues
                .filter((e) => (exclude ? !exclude.includes(e) : true))
                .map((value) => (
                  <SelectItem key={value} value={value}>
                    {t("category", { category: value })}
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
