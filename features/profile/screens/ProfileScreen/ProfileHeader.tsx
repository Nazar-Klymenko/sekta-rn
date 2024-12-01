import React from "react";

import fallbackImage from "@/assets/images/logo-big.png";
import { FirestoreUser } from "@/features/users/models/User";

import { Avatar, SizableText, XStack, YStack } from "tamagui";

interface ProfileHeaderProps {
  userData: FirestoreUser | null | undefined;
}

export const ProfileHeader = ({ userData }: ProfileHeaderProps) => (
  <XStack alignItems="center" marginBottom={18}>
    <Avatar
      circular
      size="$8"
      style={{ transform: [{ rotate: "-30deg" }], marginRight: 16 }}
    >
      <Avatar.Image src={fallbackImage} />
    </Avatar>
    <YStack>
      <SizableText fontSize="$6" fontWeight={700}>
        {userData?.username || "Guest"}
      </SizableText>
      <SizableText fontSize="$4" color="$gray10Light">
        {userData?.auth.email || "Not logged in"}
      </SizableText>
    </YStack>
  </XStack>
);
