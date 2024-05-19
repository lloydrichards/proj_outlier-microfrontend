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
import { type UnconfSchema } from "./unconf_form";

export const TitleInput = () => {
  const form = useFormContext<UnconfSchema>();

  return (
    <FormField
      control={form.control}
      name="event.title"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Title</FormLabel>
          <FormControl>
            <Input placeholder="title" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
