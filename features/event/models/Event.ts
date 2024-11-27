import { FieldValue, Timestamp } from "firebase/firestore";

export interface EventImage {
  id: string;
  publicUrl: string;
  path: string;
  altText: string;
}

export interface EventImageFile {
  uri: string;
}

interface EventTimestamps<T> {
  createdAt: T;
  updatedAt: T;
  deletedAt: T | null;
}

interface EventBase<TImage, TDate> {
  title: string;
  title_lowercase: string;
  caption: string;
  date: TDate;
  location: string;
  price: number;
  genres: string[];
  lineup: string[];
  image: TImage;
}

export type DisplayEvent = EventBase<EventImage, Timestamp> &
  EventTimestamps<Timestamp> & { id: string };

export type DocumentEvent = EventBase<EventImage, FieldValue> &
  EventTimestamps<FieldValue>;

export interface EventForm
  extends Omit<EventBase<EventImageFile, Date>, "title_lowercase"> {}

export interface EventCreateDocument extends Omit<DocumentEvent, "deletedAt"> {}

export interface EventUpdateDocument
  extends Omit<DocumentEvent, "createdAt" | "deletedAt"> {}
