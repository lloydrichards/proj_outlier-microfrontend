"use client";
import { FormLabel } from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import { type InsertBlockSchema } from "@/server/db/schema";
import { type FC } from "react";
import { useFormContext } from "react-hook-form";
import { utcFormat } from "d3-time-format";
import { Clock } from "lucide-react";

export const BlockLengthSlider: FC = () => {
  const { setValue, getValues, watch } = useFormContext<InsertBlockSchema>();
  const timeFormat = utcFormat("%I:%M");
  return (
    <div className="grid gap-2">
      <FormLabel>Block Length</FormLabel>
      <div className="flex gap-2">
        <p className="flex w-24 items-center gap-1 rounded border border-input bg-background px-2">
          <Clock size={12} />
          {timeFormat(watch("start") ?? "")}
        </p>
        <div className="grid w-full gap-2">
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
        <p className="flex w-24 items-center gap-1 rounded border border-input bg-background px-2">
          <Clock size={12} />
          {timeFormat(watch("end") ?? "")}
        </p>
      </div>
    </div>
  );
};
