"use client";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { type UnconfSchema } from "./unconf_form";

export const DescriptionTextarea = () => {
  const form = useFormContext<UnconfSchema>();

  return (
    <FormField
      control={form.control}
      name="event.summary"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea
              placeholder="description"
              className="resize-y"
              {...field}
              value={field.value ?? ""}
            />
          </FormControl>
          <FormMessage />
          <FormDescription>
            A short description of your event. This will be displayed in the
            schedule.
          </FormDescription>
        </FormItem>
      )}
    />
  );
};
