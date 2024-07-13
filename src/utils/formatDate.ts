import { format } from "date-fns";

export const formatDate = (dateStr: string) => {
  if (!dateStr) return "-";

  const date = new Date(dateStr);
  if (date.toString() === "Invalid Date") return "-";
  return format(date, "dd MMM yyy HH:mm:ss");
};
