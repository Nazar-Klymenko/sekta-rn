import { FieldValue, Timestamp } from "firebase/firestore";

import { Timestamps } from "@/features/core/models/Core";

interface BaseResident {
  name: string;
  bio: string;
  image: ResidentImage;
  metadata: Record<string, any>;
  socialMedia: Record<string, string>;
}

export interface ResidentImage {
  publicUrl: string;
  path: string;
  altText: string;
  timestamps: Timestamps<Timestamp>;
}

export interface FirestoreResident extends BaseResident {
  timestamps: Timestamps<FieldValue>;
}
export interface DisplayResident extends BaseResident {
  id: string;
  timestamps: Timestamps<Timestamp>;
}
