"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/atom/form";
import { type FC } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/atom/input";
import { type UnconfSchema } from "./unconf_form";
import { useTranslations } from "next-intl";

export const OrganizerInput: FC<{ index: number }> = ({ index }) => {
  const form = useFormContext<UnconfSchema>();
  const t = useTranslations("Forms.Unconf.Organizer.Name");
  return (
    <div className="grid grid-cols-2 gap-2">
      <FormField
        control={form.control}
        name={`organizers.${index}.firstName`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("first_label")}</FormLabel>
            <FormControl>
              <Input
                placeholder={t("first_placeholder")}
                {...field}
                value={field.value ?? ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`organizers.${index}.lastName`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("last_label")}</FormLabel>
            <FormControl>
              <Input
                placeholder={t("last_placeholder")}
                {...field}
                value={field.value ?? ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
