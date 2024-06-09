"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/atom/form";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/atom/input";
import { type UnconfSchema } from "./unconf_form";
import { useTranslations } from "next-intl";

export const TitleInput = () => {
  const form = useFormContext<UnconfSchema>();
  const t = useTranslations("Forms.Event.Title");
  return (
    <FormField
      control={form.control}
      name="event.title"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t("label")}</FormLabel>
          <FormControl>
            <Input placeholder={t("placeholder")} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
