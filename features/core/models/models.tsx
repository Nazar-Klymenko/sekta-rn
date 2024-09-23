import { Timestamp } from "firebase/firestore";

export interface PlayData {
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
