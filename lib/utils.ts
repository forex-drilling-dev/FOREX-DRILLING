import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function padNumber(n: number, width = 2): string {
  return n.toString().padStart(width, "0");
}
