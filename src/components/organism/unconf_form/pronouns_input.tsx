"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { type FC } from "react";
import { useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type UnconfSchema } from "./unconf_form";

export const PronounsInput: FC<{ index: number }> = ({ index }) => {
  const form = useFormContext<UnconfSchema>();

  return (
    <FormField
      control={form.control}
      name={`organizers.${index}.pronouns`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Pronouns</FormLabel>

          <Select
            onValueChange={field.onChange}
            defaultValue={field.value ?? ""}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select preferred pronouns" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="she/her">she/her</SelectItem>
              <SelectItem value="he/him">he/him</SelectItem>
              <SelectItem value="they/them">they/them</SelectItem>
              <SelectItem value="other">other</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
