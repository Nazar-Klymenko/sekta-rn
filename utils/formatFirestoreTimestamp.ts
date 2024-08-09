import { Timestamp } from "firebase/firestore";

import { format, isValid } from "date-fns";

type TimestampLike =
  | Date
  | Timestamp
  | number
  | { seconds: number; nanoseconds: number };

export const formatFirestoreTimestamp = (
  timestamp: TimestampLike,
  dateFormat: string
): string => {
  let date: Date;

  if (timestamp instanceof Date) {
    date = timestamp;
  } else if (timestamp instanceof Timestamp) {
    date = timestamp.toDate();
  } else if (typeof timestamp === "number") {
    date = new Date(timestamp * 1000); // Assume seconds, convert to milliseconds
  } else if (
    typeof timestamp === "object" &&
    "seconds" in timestamp &&
    "nanoseconds" in timestamp
  ) {
    date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
  } else {
    throw new Error("Invalid timestamp format");
  }

  if (!isValid(date)) {
    throw new Error("Invalid date");
  }

  return format(date, dateFormat);
};
