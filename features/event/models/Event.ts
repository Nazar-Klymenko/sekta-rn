import { FieldValue, Timestamp } from "firebase/firestore";

import { Timestamps } from "@/features/core/models/Core";

export interface BaseEventImage {
  publicUrl: string; // Full URL for display
  path: string; // Storage path
  altText: string; // For accessibility
}

export interface FirestoreEventImage extends BaseEventImage {
  timestamps: Timestamps<FieldValue>;
}

export interface DisplayEventImage extends BaseEventImage {
  timestamps: Timestamps<Timestamp>;
}

export interface EventImageFile {
  uri: string | Blob;
}

interface EventTitle {
  display: string;
  lowercase: string;
}

interface FlatEventPrice {
  type: "flat";
  amount: number;
}

export type EventPrice = FlatEventPrice;
// Base interface for common fields
export interface BaseEvent {
  uid: string;
  title: EventTitle;
  caption: string;
  date: Timestamp;
  location: string;
  price: EventPrice;
  genres: string[];
  lineup: string[];
  deletedAt: Timestamp | null;
  metadata: Record<string, any>;
}

// Interface for form data
export interface FirestoreEvent extends BaseEvent {
  timestamps: Timestamps<FieldValue>;
  image: FirestoreEventImage;
}

// Interface for stored data
export interface DisplayEvent extends BaseEvent {
  timestamps: Timestamps<Timestamp>;
  image: DisplayEventImage;
}
