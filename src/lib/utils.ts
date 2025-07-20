import { Capacitor } from "@capacitor/core"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merge multiple class names into a single string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Check if the app is running on a native platform.
 */
export const isNative = Capacitor.isNativePlatform;
