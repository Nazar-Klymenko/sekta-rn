import { Timestamp } from "firebase/firestore";

export interface EventImage {
  id: string;
  publicUrl: string;
  path: string;
  altText: string;
}

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
  image: EventImage;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt: Timestamp | null;
  metadata: Record<string, any>;
}
export type EventFormData = Omit<
  Event,
  | "id"
  | "date"
  | "createdAt"
  | "updatedAt"
  | "deletedAt"
  | "title_lowercase"
  | "metadata"
  | "image"
> & {
  date: Date | null;
};
