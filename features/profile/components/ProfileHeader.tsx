import React from "react";

import { User } from "firebase/auth";

import { User as UserData } from "@/features/users/models/User";

import { User as UserIcon } from "@tamagui/lucide-icons";

import { Avatar, Paragraph, YStack } from "tamagui";

interface ProfileHeaderProps {
  user: User | null;
  userData: UserData | null | undefined;
}
export const ProfileHeader = ({ user, userData }: ProfileHeaderProps) => (
  <YStack alignItems="center" gap="$2">
    <Avatar circular size="$12">
      {user?.photoURL ? (
        <Avatar.Image src={user.photoURL} />
      ) : (
        <Avatar.Fallback
          backgroundColor="$blue10Light"
          justifyContent="center"
          alignItems="center"
        >
          <UserIcon size="$8" color="$blue1Light" />
        </Avatar.Fallback>
      )}
    </Avatar>
    <Paragraph fontSize="$6" fontWeight={700}>
      {userData?.username || user?.displayName || "Guest"}
    </Paragraph>
    <Paragraph fontSize="$4" color="$gray10Light">
      {userData?.email || user?.email || "Not logged in"}
    </Paragraph>
  </YStack>
);
