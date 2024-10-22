import { Timestamp } from "firebase/firestore";

export interface BaseEvent {
  title: string;
  caption: string;
  date: Date | Timestamp;
  location: string;
  price: number;
  genres: string[];
  lineup: string[];
}

export interface Event extends BaseEvent {
  id: string;
  title_lowercase: string;
  date: Timestamp;
  image: {
    id: string;
    publicUrl: string;
    path: string;
    altText?: string;
  };
  attendeeCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt: Timestamp | null;
  metadata: Record<string, any>;
}

export interface EventFormData extends BaseEvent {
  date: Date;
}
