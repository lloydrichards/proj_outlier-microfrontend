"use client";
import {
  FormControl,
  FormDescription,
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

export const EmailInput: FC<{ index: number }> = ({ index }) => {
  const form = useFormContext<UnconfSchema>();
  const t = useTranslations("Forms.Unconf.Organizer.Email");
  return (
    <FormField
      control={form.control}
      name={`organizers.${index}.email`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t("label")}</FormLabel>
          <FormControl>
            <Input
              placeholder={t("placeholder")}
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
