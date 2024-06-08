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

const pronouns = ["she/her", "he/him", "they/them", "other"];

export const PronounsInput: FC<{ index: number }> = ({ index }) => {
  const form = useFormContext<UnconfSchema>();
  const t = useTranslations("Forms.Unconf.Organizer.Pronouns");
  return (
    <FormField
      control={form.control}
      name={`organizers.${index}.pronouns`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t("title")}</FormLabel>

          <Select
            onValueChange={field.onChange}
            defaultValue={field.value ?? ""}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={t("placeholder")} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {pronouns.map((pronoun) => (
                <SelectItem key={pronoun} value={pronoun}>
                  {t("select", { pronoun })}
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
