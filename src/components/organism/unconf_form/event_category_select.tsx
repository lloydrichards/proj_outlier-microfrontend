"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { categoryEnum } from "@/server/db/schema";
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

export const EventCategorySelect: FC<{
  exclude?: string[];
}> = ({ exclude }) => {
  const form = useFormContext<UnconfSchema>();
  return (
    <FormField
      control={form.control}
      name="event.category"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Category</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select category of event" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {categoryEnum.enumValues
                .filter((e) => (exclude ? !exclude.includes(e) : true))
                .map((value) => (
                  <SelectItem key={value} value={value}>
                    {value}
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
