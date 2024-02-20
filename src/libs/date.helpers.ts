import { format, formatDistance, parseISO } from "date-fns";

export const safeParseISO = (isoString: string): Date | null => {
  try {
    const formattedDate = parseISO(isoString);
    if (formattedDate.toString().includes("Invalid Date")) return null;

    return formattedDate;
  } catch (err) {
    return null;
  }
};

const isInvalid = (e: unknown) => String(e) === "Invalid Date";

export const safeFormat = (...args: Parameters<typeof format>) => {
  if (isInvalid(args[0])) return null;

  return format(...args);
};

export const safeFormatDistance = (
  ...args: Parameters<typeof formatDistance>
) => {
  try {
    return formatDistance(...args);
  } catch {
    return null;
  }
};

export const dateFromNow = (date: Date) =>
  safeFormatDistance(new Date(), date, { addSuffix: true });

export const dateToNow = (date: Date) =>
  safeFormatDistance(date, new Date(), { addSuffix: true });
