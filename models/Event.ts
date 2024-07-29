// src/models/Event.ts
import { Timestamp } from "firebase/firestore";

export interface Event {
  id: string;
  date: Timestamp; //TODO: change to firestore timestamp
  caption: string;
  genres: string[];
  image: {
    publicUrl: string;
  };
  lineup: string[];
  title: string;
  price: number;
  location: string;
}
