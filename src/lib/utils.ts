import { type ClassValue, clsx } from "clsx";
import { timeFormat } from "d3-time-format";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTime = timeFormat("%I:%M");
export const formatDate = timeFormat("%a %b %d");
