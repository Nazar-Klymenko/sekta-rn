import { Alert } from "react-native";

import { EventImageFile } from "@/features/event/models/Event";

import * as ImagePicker from "expo-image-picker";

export function useImagePicker() {
  const requestMediaLibraryPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission required",
        "Sorry, we need camera roll permissions to make this work!"
      );
      return false;
    }
    return true;
  };

  const pickImage = async (): Promise<EventImageFile | null> => {
    const hasPermission = await requestMediaLibraryPermissions();
    if (!hasPermission) return null;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        return { uri: result.assets[0].uri };
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to pick image. Please try again.");
    }
    return null;
  };

  return { pickImage };
}
