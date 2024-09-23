import { Timestamp } from "firebase/firestore";

export interface Resident {
  id: string;
  displayName: string;
  email?: string;
  phone?: string;
  socialMedia: {
    soundcloud?: string;
    youtube?: string;
    instagram?: string;
    facebook?: string;
  };
  image: {
    publicUrl: string;
  };
  genres: string[];
  locations: string[];
  additionalInfo?: string;
  submittedAt: Timestamp;
}
