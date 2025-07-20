import { Capacitor } from "@capacitor/core"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isNative = Capacitor.isNativePlatform;
