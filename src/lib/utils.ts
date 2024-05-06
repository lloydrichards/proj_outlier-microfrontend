import { type ClassValue, clsx } from "clsx";
import { utcFormat } from "d3-time-format";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTimeWithMeridiem = utcFormat("%I:%M %p");
export const formatTime = utcFormat("%I:%M");
export const formatDate = utcFormat("%a %b %d");
