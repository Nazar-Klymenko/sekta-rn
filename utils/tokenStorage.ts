import { Platform } from "react-native";

import * as SecureStore from "expo-secure-store";

const AUTH_TOKEN_KEY = "firebaseAuthToken";

async function isSecureStoreAvailable() {
  return await SecureStore.isAvailableAsync();
}

export const setAuthToken = async (token: string): Promise<void> => {
  if (Platform.OS !== "web" && (await isSecureStoreAvailable())) {
    await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
  }
};

export const getAuthToken = async (): Promise<string | null> => {
  if (Platform.OS !== "web" && (await isSecureStoreAvailable())) {
    return await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
  }
  return null;
};

export const removeAuthToken = async (): Promise<void> => {
  if (Platform.OS !== "web" && (await isSecureStoreAvailable())) {
    await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
  }
};
