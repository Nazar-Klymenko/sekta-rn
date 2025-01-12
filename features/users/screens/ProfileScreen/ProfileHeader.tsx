import fallbackImage from "@/assets/images/logo-big.png";

import React from "react";

import { Avatar, SizableText, XStack, YStack } from "tamagui";

import { useAuth } from "@/features/auth/hooks/useAuth";

export function ProfileHeader() {
  const { displayUser, isLoading } = useAuth();

  let content;
  if (isLoading) {
    content = (
      <YStack>
        <SizableText fontSize="$6" fontWeight={700}>
          Setting up your profile...
        </SizableText>
      </YStack>
    );
  } else if (displayUser) {
    content = (
      <YStack>
        <SizableText fontSize="$6" fontWeight={700}>
          {displayUser.username}
        </SizableText>
        <SizableText fontSize="$4" color="gray">
          {displayUser.auth.email}
        </SizableText>
      </YStack>
    );
  } else {
    content = (
      <YStack>
        <SizableText fontSize="$6" fontWeight={700}>
          Guest
        </SizableText>
        <SizableText fontSize="$4" color="gray">
          Not logged in
        </SizableText>
      </YStack>
    );
  }

  return (
    <XStack alignItems="center" marginBottom={18}>
      <Avatar circular size="$8" style={{ marginRight: 16 }}>
        <Avatar.Image src={fallbackImage} />
      </Avatar>
      {content}
    </XStack>
  );
}
