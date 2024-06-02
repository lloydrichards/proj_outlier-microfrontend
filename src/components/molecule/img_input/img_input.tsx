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
import { useTranslations } from "next-intl";

export const ImgInput = () => {
  const form = useFormContext<{ imageUrl?: string }>();
  const t = useTranslations("Forms.ImgInput");
  return (
    <FormField
      control={form.control}
      name="imageUrl"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t("title")}</FormLabel>
          <FormControl>
            <Input
              placeholder="https://"
              {...field}
              value={field.value ?? ""}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
