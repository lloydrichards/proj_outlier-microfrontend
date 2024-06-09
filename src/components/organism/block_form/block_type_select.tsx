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
import { type InsertBlockSchema, blockEnum } from "@/server/db/schema";
import { useTranslations } from "next-intl";
import { type FC } from "react";
import { useFormContext } from "react-hook-form";

export const BlockTypeSelect: FC = () => {
  const form = useFormContext<InsertBlockSchema>();
  const tCommon = useTranslations("Common");
  const t = useTranslations("Forms.Block.Type");
  return (
    <FormField
      control={form.control}
      name="type"
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
              {blockEnum.enumValues.map((value) => (
                <SelectItem key={value} value={value}>
                  {tCommon("type", { type: value })}
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
