import { cn } from "@/lib/utils";

// Core Typefaces

export const typefaceTitle = (className?: string) =>
  cn("text-md font-semibold leading-tight tracking-wide", className);

export const typefaceSubtitle = (className?: string) =>
  cn(
    "text-sm font-semibold uppercase leading-normal tracking-wider",
    className,
  );

export const typefaceBody = (className?: string) =>
  cn("text-sm font-normal leading-normal", className);

export const typefaceMeta = (className?: string) =>
  cn("text-sm font-semibold leading-normal tracking-wider", className);
