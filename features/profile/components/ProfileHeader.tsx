import React from "react";

import { User } from "firebase/auth";

import { UserData } from "@/shared/models/UserData";

import { User as UserIcon } from "@tamagui/lucide-icons";

import { Avatar, Text, YStack } from "tamagui";

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
    <Text fontSize="$6" fontWeight="bold">
      {userData?.username || user?.displayName || "Guest"}
    </Text>
    <Text fontSize="$3" color="$gray10Light">
      {userData?.email || user?.email || "Not logged in"}
    </Text>
  </YStack>
);
