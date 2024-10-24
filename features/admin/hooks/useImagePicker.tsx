import { useState } from "react";

import { Alert } from "react-native";

import * as ImagePicker from "expo-image-picker";

export function useImagePicker() {
  const [image, setImage] = useState<string | null>(null);

  const requestMediaLibraryPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission required",
        "Sorry, we need camera roll permissions to make this work!"
      );
    }
  };

  const pickImage = async () => {
    await requestMediaLibraryPermissions();
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to pick image. Please try again.");
    }
  };

  return { image, setImage, pickImage };
}
