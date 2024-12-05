import React from "react";

import fallbackImage from "@/assets/images/logo-big.png";
import { DisplayUser } from "@/features/users/models/User";

import { Avatar, SizableText, XStack, YStack } from "tamagui";

interface ProfileHeaderProps {
  userData: DisplayUser;
  isLoading: boolean;
}

export function ProfileHeader({ userData, isLoading }: ProfileHeaderProps) {
  let context;
  if (isLoading) {
    context = (
      <YStack>
        <SizableText fontSize="$6" fontWeight={700}>
          Setting up your profile...
        </SizableText>
      </YStack>
    );
  } else {
    context = (
      <YStack>
        <SizableText fontSize="$6" fontWeight={700}>
          {userData?.username || "Guest"}
        </SizableText>
        <SizableText fontSize="$4" color="$gray10Light">
          {userData?.auth?.email || "Not logged in"}
        </SizableText>
      </YStack>
    );
  }

  return (
    <XStack alignItems="center" marginBottom={18}>
      <Avatar
        circular
        size="$8"
        style={{ transform: [{ rotate: "-30deg" }], marginRight: 16 }}
      >
        <Avatar.Image src={fallbackImage} />
      </Avatar>
      {context}
    </XStack>
  );
}
