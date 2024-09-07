import { Timestamp } from "firebase/firestore";

export interface Event {
  id: string;

  title: string;
  title_lowercase: string;
  caption: string;

  date: Timestamp;
  location: string;
  price: number;

  genres: string[];
  lineup: string[];

  image: {
    id: string;
    url: string;
    path: string;
    altText?: string; // For accessibility
  };

  attendeeCount: number;

  status: "draft" | "published";

  createdAt: Timestamp;
  updatedAt: Timestamp;
  publishedAt: Timestamp | null;
  deletedAt: Timestamp | null;

  metadata: Record<string, any>; // For custom fields
}
