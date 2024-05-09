"use client";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { type FC } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { type UnconfSchema } from "./unconf_form";

export const EmailInput: FC<{ index: number }> = ({ index }) => {
  const form = useFormContext<UnconfSchema>();

  return (
    <FormField
      control={form.control}
      name={`organizers.${index}.email`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input
              placeholder="data@dvs.com"
              {...field}
              value={field.value ?? ""}
            />
          </FormControl>
          <FormMessage />
          <FormDescription>
            Make sure to use the email address you used to register for the
            conference.
          </FormDescription>
        </FormItem>
      )}
    />
  );
};
