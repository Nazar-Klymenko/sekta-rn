// src/models/Event.ts

export interface Event {
  id: string;
  date: number; // Unix timestamp in milliseconds
  caption: string;
  genres: string[];
  image: {
    publicUrl: string;
  };
  lineup: string[];
  title: string;
}
