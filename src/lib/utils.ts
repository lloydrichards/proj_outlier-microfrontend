import { type ClassValue, clsx } from "clsx";
import { timeFormat } from "d3-time-format";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTimeWithMeridiem = timeFormat("%I:%M %p");
export const formatTime = timeFormat("%H:%M");
export const formatDate = timeFormat("%a %b %d");
