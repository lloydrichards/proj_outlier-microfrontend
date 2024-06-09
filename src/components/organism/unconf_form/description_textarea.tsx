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
import { type UnconfSchema } from "./unconf_form";
import { useTranslations } from "next-intl";

export const DescriptionTextarea = () => {
  const form = useFormContext<UnconfSchema>();
  const t = useTranslations("Forms.Unconf.Event.Summary");
  return (
    <FormField
      control={form.control}
      name="event.summary"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t("label")}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={t("placeholder")}
              className="resize-y"
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
