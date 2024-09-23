// hooks/usePlatform.ts
import { Platform } from "react-native";

export function usePlatform() {
  const isWeb = Platform.OS === "web";
  const isIOS = Platform.OS === "ios";
  const isAndroid = Platform.OS === "android";

  return {
    isWeb,
    isIOS,
    isAndroid,
    isNative: !isWeb,
  };
}
