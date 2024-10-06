export interface User {
  id: string;
  email: string;
  username: string;
  fullName?: string;
  theme?: "dark" | "light";
  language?: "pl" | "en" | "ru" | "ua";
  agreeTos: boolean;
  agreeEmail?: boolean;
  status?: "active" | "pending_deletion" | "deleted";
  deletionRequestedAt?: Date;
  isAdmin?: boolean;
}
