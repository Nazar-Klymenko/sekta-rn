import { FieldValue, Timestamp } from "firebase/firestore";

import { Timestamps } from "@/features/core/models/Core";

interface AuthData {
  email: string;
  emailVerified: boolean;
}

interface UserSettings {
  agreeTos: boolean;
  agreeEmail: boolean;
}

interface BaseUser {
  uid: string;
  username: string;
  auth: AuthData;
  settings: UserSettings;
  isAdmin: boolean;
  metadata: Record<string, any>;
}

export interface FirestoreUser extends BaseUser {
  timestamps: Timestamps<FieldValue>;
}

export interface DisplayUser extends BaseUser {
  timestamps: Timestamps<Timestamp>;
}
