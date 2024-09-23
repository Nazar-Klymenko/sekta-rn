import { Timestamp } from "firebase/firestore";

export interface PlaySubmission {
  id: string;
  email: string;
  phone?: string;
  soundcloud?: string;
  youtube?: string;
  instagram?: string;
  facebook?: string;
  additionalInfo?: string;
  submittedAt: Timestamp;
}
