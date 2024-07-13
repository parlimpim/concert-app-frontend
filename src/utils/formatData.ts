import { format } from "date-fns";
import en from "./en";

export const formatDate = (dateStr: string) => {
  if (!dateStr) return "-";

  const date = new Date(dateStr);
  if (date.toString() === "Invalid Date") return "-";
  return format(date, "dd MMM yyy HH:mm:ss");
};

export const formatString = (s: string, ...args: any[]) => {
  return s.replace(/{([0-9]+)}/g, function (match, index) {
    return typeof args[index] === "undefined" ? match : args[index];
  });
};

export const formatErrorMessage = (message: string | []) => {
  if (Array.isArray(message) && message.length) {
    return message[0];
  } else {
    return message;
  }
};
