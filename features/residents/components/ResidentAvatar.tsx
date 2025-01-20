import fallbackImage from "@/assets/images/logo-big.png";

import React from "react";

import { Avatar } from "tamagui";

import { DisplayResident } from "../models/Resident";

interface ResidentAvatarProps {
  image: DisplayResident["image"];
}
export const ResidentAvatar = ({ image }: ResidentAvatarProps) => {
  return (
    <Avatar circular size="$8">
      <Avatar.Image
        accessibilityLabel={image?.altText || ""}
        src={image?.publicUrl}
      />
      <Avatar.Fallback delayMs={600} backgroundColor={"$accent"} />
    </Avatar>
  );
};
