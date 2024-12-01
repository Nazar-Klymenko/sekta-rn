import { Timestamp } from "firebase/firestore";

import { format } from "date-fns";

export const formatFirestoreTimestamp = (
  timestamp: Timestamp,
  dateFormat: string
): string | null => {
  if (timestamp) {
    return format(timestamp.toDate(), dateFormat);
  } else {
    return null;
  }
};
