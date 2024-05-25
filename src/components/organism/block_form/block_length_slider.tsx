"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/atom/form";
import { Slider } from "@/components/atom/slider";
import { type InsertBlockSchema } from "@/server/db/schema";
import { type FC } from "react";
import { useFormContext } from "react-hook-form";
import { CalendarIcon, Clock } from "lucide-react";
import { cn, formatDate, formatTime } from "@/lib/utils";
import { Calendar } from "@/components/atom/calendar";
import { Button } from "@/components/atom/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/atom/popover";

import { PopoverClose } from "@radix-ui/react-popover";

export const BlockLengthSlider: FC = () => {
  const { setValue, getValues } = useFormContext<InsertBlockSchema>();
  return (
    <div className="grid gap-2">
      <CalendarInput />
      <FormLabel>Block Length</FormLabel>
      <div className="flex items-start gap-4">
        <TimeInput name="start" />
        <div className="grid w-full gap-2 pt-2">
          <Slider
            defaultValue={[
              (getValues("end")?.getTime() - getValues("start")?.getTime() ??
                0) /
                1000 /
                60,
            ]}
            min={0}
            max={120}
            step={10}
            onValueChange={(value) => {
              const start = getValues("start");
              setValue(
                "end",
                new Date(start.getTime() + (value[0] ?? 0) * 60 * 1000),
              );
            }}
          />
          <div className="flex justify-between px-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <p key={i} className="w-4 text-center">
                {i * 30}
              </p>
            ))}
          </div>
        </div>
        <TimeInput name="end" />
      </div>
    </div>
  );
};

const TimeInput: FC<{ name: "start" | "end" }> = ({ name }) => {
  const form = useFormContext<InsertBlockSchema>();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormControl>
            <Popover>
              <PopoverTrigger asChild>
                <Button className="flex h-fit w-24 items-center gap-1 rounded border border-input bg-background p-2">
                  <Clock size={12} />
                  {field.value ? formatTime(field.value) : "--:--"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="flex h-96 w-40 overflow-scroll p-0">
                <div className="flex w-1/2 flex-col overflow-scroll">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <PopoverClose key={i}>
                      <Button
                        key={i}
                        className="px-2 hover:bg-foreground/10"
                        disabled={!field.value}
                        onClick={(e) => {
                          e.preventDefault();
                          const value = field.value;
                          value.setHours(i);
                          field.onChange(value);
                        }}
                      >
                        {i.toString().padStart(2, "0")} H
                      </Button>
                    </PopoverClose>
                  ))}
                </div>
                <div className="flex w-1/2 flex-col overflow-scroll">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <PopoverClose key={i}>
                      <Button
                        key={i}
                        className="px-2 hover:bg-foreground/10"
                        disabled={!field.value}
                        onClick={(e) => {
                          e.preventDefault();
                          const value = field.value;
                          value.setMinutes(i * 10);
                          field.onChange(value);
                        }}
                      >
                        {i * 5} M
                      </Button>
                    </PopoverClose>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

const CalendarInput: FC = () => {
  const form = useFormContext<InsertBlockSchema>();
  return (
    <FormField
      control={form.control}
      name="start"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Block Date</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className={cn(
                    "w-1/2 pl-3 text-left font-normal",
                    !field.value && "text-foreground/80",
                  )}
                >
                  {field.value ? (
                    formatDate(field.value)
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto size-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
