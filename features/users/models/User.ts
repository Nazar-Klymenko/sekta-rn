import { FieldValue, Timestamp } from "firebase/firestore";

interface Metadata {
  createdAt: Timestamp | FieldValue;
  updatedAt: Timestamp | FieldValue;
}

interface AuthData {
  email: string;
  emailVerified: boolean;
}

interface UserSettings {
  agreeTos: boolean;
  agreeEmail: boolean;
}

export interface FirestoreUser {
  uid: string;
  username: string;
  auth: AuthData;
  settings: UserSettings;
  metadata: Metadata;
  isAdmin: boolean;
}
