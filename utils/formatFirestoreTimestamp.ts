import { format } from "date-fns";

// Define the type for Firestore timestamp
interface FirestoreTimestamp {
  seconds: number;
  nanoseconds: number;
}

// Define the function with appropriate types
export const formatFirestoreTimestamp = (
  timestamp: FirestoreTimestamp | number,
  dateFormat: string
): string => {
  let date: Date;

  if (typeof timestamp === "number") {
    // When timestamp is a UNIX timestamp (seconds since epoch)
    date = new Date(timestamp * 1000); // Convert to milliseconds
  } else {
    // When timestamp is a Firestore timestamp
    date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
  }

  return format(date, dateFormat);
};
