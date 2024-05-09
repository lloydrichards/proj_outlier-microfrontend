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
import { Input } from "@/components/ui/input";
import { type UnconfSchema } from "./unconf_form";

export const OrganizerInput: FC<{ index: number }> = ({ index }) => {
  const form = useFormContext<UnconfSchema>();

  return (
    <div className="grid grid-cols-2 gap-2">
      <FormField
        control={form.control}
        name={`organizers.${index}.firstName`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>First Name</FormLabel>
            <FormControl>
              <Input
                placeholder="Giorgia"
                {...field}
                value={field.value ?? ""}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`organizers.${index}.lastName`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Last Name</FormLabel>
            <FormControl>
              <Input placeholder="Lupi" {...field} value={field.value ?? ""} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
