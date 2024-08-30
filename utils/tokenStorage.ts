import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const AUTH_TOKEN_KEY = "firebaseAuthToken";

export const setAuthToken = async (token: string): Promise<void> => {
  if (Platform.OS !== "web") {
    await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
  }
};

export const getAuthToken = async (): Promise<string | null> => {
  if (Platform.OS !== "web") {
    return await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
  } else return null;
};

export const removeAuthToken = async (): Promise<void> => {
  if (Platform.OS !== "web") {
    await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
  }
};
