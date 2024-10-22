import React from "react";

import { Camera } from "@tamagui/lucide-icons";

import { Image, SizableText, Stack, YStack, styled } from "tamagui";

const ImagePickerBox = styled(Stack, {
  width: "100%",
  aspectRatio: 1,
  borderWidth: 2,
  borderColor: "$secondary",
  borderStyle: "dashed",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "$backgroundHover",

  // Use Tamagui's shadow tokens instead of platform-specific shadow properties
  shadowColor: "$shadowColor",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  // Add hover and pressed states
  hoverStyle: {
    backgroundColor: "$backgroundFocus",
  },
  pressStyle: {
    backgroundColor: "$backgroundPress",
  },
});

interface CustomImagePickerProps {
  onPress: () => void;
  image: string | null;
}

export const CustomImagePicker: React.FC<CustomImagePickerProps> = ({
  onPress,
  image,
}) => {
  return (
    <ImagePickerBox onPress={onPress}>
      {image ? (
        <Image source={{ uri: image }} width="100%" height="100%" />
      ) : (
        <YStack alignItems="center">
          <Camera size="$6" color="$secondary" />
          <SizableText size="$6" color="$secondary">
            Tap to pick an image
          </SizableText>
        </YStack>
      )}
    </ImagePickerBox>
  );
};
