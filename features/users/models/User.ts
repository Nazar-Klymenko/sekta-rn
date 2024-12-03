import { FieldValue, Timestamp } from "firebase/firestore";

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
}

export interface FirestoreUser extends BaseUser {
  metadata: {
    createdAt: FieldValue;
    updatedAt: FieldValue;
  };
}

export interface DisplayUser extends BaseUser {
  metadata: {
    createdAt: Timestamp;
    updatedAt: Timestamp;
  };
}
