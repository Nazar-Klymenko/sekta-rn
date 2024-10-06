import { Timestamp } from "firebase/firestore";

import { format } from "date-fns";

export const formatFirestoreTimestamp = (
  timestamp: Timestamp,
  dateFormat: string,
): string => {
  return format(timestamp.toDate(), dateFormat);
};
