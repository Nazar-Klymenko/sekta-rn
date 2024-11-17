import { Timestamp } from "firebase/firestore";

// Base interface for common fields
export interface BaseEvent {
  title: string;
  caption: string;
  date: Date | Timestamp;
  location: string;
  price: number;
  genres: string[];
  lineup: string[];
}

// Interface for form data
export interface EventFormData extends BaseEvent {
  date: Date; // Override to be specifically Date for forms
}
export interface EventImage {
  id: string;
  publicUrl: string;
  path: string;
  altText: string;
}
// Interface for stored data
export interface Event extends Omit<BaseEvent, "date"> {
  id: string;
  title_lowercase: string;
  date: Timestamp; // Override to be specifically Timestamp for stored data
  image: EventImage;
  attendeeCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt: Timestamp | null;
  metadata: Record<string, any>;
}
