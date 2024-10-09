import { Timestamp } from "firebase/firestore";

export interface Event {
  id: string;

  title: string;
  title_lowercase: string;
  caption: string;

  date: Timestamp;
  location: string;
  price: number;

  genres: string[] | [];
  lineup: string[] | [];

  image: {
    id: string;
    publicUrl: string;
    path: string;
    altText?: string; // For accessibility
  };

  attendeeCount: number;

  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt: Timestamp | null;

  metadata: Record<string, any>; // For custom fields
}
