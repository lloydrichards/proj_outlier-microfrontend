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
import type { UnconfSchema } from "./unconf_form";

export const AdditionalInfoTextarea = () => {
  const form = useFormContext<UnconfSchema>();

  return (
    <FormField
      control={form.control}
      name="event.description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Additional Info</FormLabel>
          <FormControl>
            <Textarea
              placeholder="description"
              className="h-40 resize-y"
              {...field}
              value={field.value ?? ""}
            />
          </FormControl>
          <FormMessage />
          <FormDescription>
            Please provide us with details on setting up the event. This will be
            used to evaluate your submission.
          </FormDescription>
        </FormItem>
      )}
    />
  );
};
