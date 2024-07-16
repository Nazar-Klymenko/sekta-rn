export interface UserData {
  email: string;
  username: string;
  fullName?: string;
  theme?: "dark" | "light";
  language?: "pl" | "en" | "ru" | "ua";
  agreeTos: boolean;
  agreeEmail?: boolean;
}
