import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTimestamp = (date: string | Date): string => {
  const validDate = typeof date === "string" ? new Date(date) : date;

  if (isNaN(validDate.getTime())) {
    console.error("Invalid date provided to formatTimestamp:", date);
    return "Invalid Date";
  }

  const now = new Date();
  const diffInMinutes = Math.floor(
    (now.getTime() - validDate.getTime()) / (1000 * 60)
  );

  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;

  return validDate.toLocaleDateString();
};
// export const formatTimestamp = (date: Date): string => {
//   const now = new Date();
//   const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

//   if (diffInMinutes < 1) return 'Just now';
//   if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
//   if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;

//   return date.toLocaleDateString();
// };

export const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export const scrollToBottom = (element: HTMLElement) => {
  element.scrollTop = element.scrollHeight;
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error("Failed to copy:", error);
    return false;
  }
};
