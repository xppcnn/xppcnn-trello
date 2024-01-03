import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
// import { formatInTimeZone } from "date-fns-tz";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function DateFormat(time: Date, formatText = "yyyy-MM-dd HH:mm:ss") {
  let date = time;
  if (!(time instanceof Date)) {
    date = new Date(time);
  }
  return format(date, formatText, { locale: zhCN });
}

// export const formatDateToLocal = (dateStr: string | Date) => {
//   let date = dateStr;
//   if (!(dateStr instanceof Date)) {
//     date = new Date(dateStr);
//   }
//   return formatInTimeZone(date, "Asia/Shanghai", "yyyy-MM-dd HH:mm:ss");
// };
