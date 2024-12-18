import { FieldValue, Timestamp } from "firebase/firestore";

import { Timestamps } from "@/features/core/models/Core";

export interface EventImage {
  publicUrl: string; // Full URL for display
  path: string; // Storage path
  altText: string; // For accessibility
  timestamps: Timestamps<Timestamp>; // Metadata
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

// interface ConditionalEventPrice {
//   type: "conditional";
//   price: {
//     from: Date | string | null;
//     to: Date | string | null;
//     amount: number;
//   }[];
// }

export type EventPrice = FlatEventPrice; //| ConditionalEventPrice;

// Base interface for common fields
export interface BaseEvent {
  uid: string;
  image: EventImage;
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
}

// Interface for stored data
export interface DisplayEvent extends BaseEvent {
  timestamps: Timestamps<Timestamp>;
}
