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

export interface CommonEventFields {
  title: string;
  caption: string;
  location: string;
  price: number;
  genres: string[];
  lineup: string[];
}

export interface EventTimestamps {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt: Timestamp | null;
}

export interface EventDocumentTimestamps {
  createdAt: FieldValue;
  updatedAt: FieldValue;
  deletedAt: FieldValue | null;
}
export interface DocumentEventBase
  extends CommonEventFields,
    EventDocumentTimestamps {
  title_lowercase: string;
  date: FieldValue;
  image: EventImage;
}

//final intefaces
export interface DisplayEvent extends CommonEventFields, EventTimestamps {
  id: string;
  title_lowercase: string;
  date: Timestamp;
  image: EventImage;
}

export interface EventForm extends CommonEventFields {
  date: Date;
  image: EventImageFile;
}

export interface EventCreateDocument
  extends Omit<DocumentEventBase, "deletedAt"> {}

export interface EventUpdateDocument
  extends Omit<DocumentEventBase, "createdAt" | "deletedAt"> {}
