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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atom/select";
import { type UnconfSchema } from "./unconf_form";
import { useTranslations } from "next-intl";

const pronouns = [
  { value: "she/her", key: "she" },
  { value: "he/him", key: "he" },
  { value: "they/them", key: "they" },
  { value: "other", key: "other" },
];

export const PronounsInput: FC<{ index: number }> = ({ index }) => {
  const form = useFormContext<UnconfSchema>();
  const t = useTranslations("Forms.Unconf.Organizer.Pronouns");
  return (
    <FormField
      control={form.control}
      name={`organizers.${index}.pronouns`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t("label")}</FormLabel>

          <Select
            onValueChange={field.onChange}
            defaultValue={field.value ?? ""}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={t("helper")} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {pronouns.map(({ key, value }) => (
                <SelectItem key={key} value={value}>
                  {t("select", { pronoun: key })}
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
