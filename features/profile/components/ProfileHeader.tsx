import React from "react";

import { User } from "firebase/auth";

import fallbackImage from "@/assets/images/logo-big.png";
import { User as UserData } from "@/features/users/models/User";

import { Avatar, Paragraph, YStack } from "tamagui";

interface ProfileHeaderProps {
  user: User | null;
  userData: UserData | null | undefined;
}
export const ProfileHeader = ({ user, userData }: ProfileHeaderProps) => (
  <YStack alignItems="center" gap="$2">
    <Avatar circular size="$12" style={{ transform: [{ rotate: "-30deg" }] }}>
      <Avatar.Image src={fallbackImage} />
    </Avatar>
    <Paragraph fontSize="$6" fontWeight={700}>
      {userData?.username || user?.displayName || "Guest"}
    </Paragraph>
    <Paragraph fontSize="$4" color="$gray10Light">
      {userData?.email || user?.email || "Not logged in"}
    </Paragraph>
  </YStack>
);
