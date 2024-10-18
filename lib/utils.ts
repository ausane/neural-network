import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const addNodes = (count: number, addNode: () => void) => {
  for (let i = 0; i < count; i++) {
    addNode()
  }
}
