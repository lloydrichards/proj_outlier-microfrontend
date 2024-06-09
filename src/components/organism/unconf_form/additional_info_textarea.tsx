"use client";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/atom/form";
import { useFormContext } from "react-hook-form";
import { Textarea } from "@/components/atom/textarea";
import type { UnconfSchema } from "./unconf_form";
import { useTranslations } from "next-intl";

export const AdditionalInfoTextarea = () => {
  const form = useFormContext<UnconfSchema>();
  const t = useTranslations("Forms.Unconf.Event.Description");
  return (
    <FormField
      control={form.control}
      name="event.description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t("label")}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={t("placeholder")}
              className="h-40 resize-y"
              {...field}
              value={field.value ?? ""}
            />
          </FormControl>
          <FormMessage />
          <FormDescription>{t("helper")}</FormDescription>
        </FormItem>
      )}
    />
  );
};
