import { Bell, Menu } from "@tamagui/lucide-icons";
import { User } from "firebase/auth";

import React from "react";

import { UserData } from "@/models/UserData";

import { useRouter } from "expo-router";
import { Avatar, Text, XStack, YStack, styled } from "tamagui";

const HeaderContainer = styled(XStack, {
  paddingVertical: "$2",
  paddingHorizontal: "$4",
  backgroundColor: "$backgroundStrong",
  borderBottomWidth: 1,
  borderBottomColor: "$borderColor",
  alignItems: "center",
  justifyContent: "space-between",
  height: 56,
});

const LogoText = styled(Text, {
  fontSize: "$5",
  fontWeight: "bold",
  color: "$color",
});

const IconButton = styled(XStack, {
  padding: "$2",
  borderRadius: "$4",
  backgroundColor: "$backgroundHover",
  alignItems: "center",
  justifyContent: "center",
});
interface HeaderProps {
  title: string;
  user?: User | null;
}
export const CustomHeader = ({ title, user }: HeaderProps) => {
  const router = useRouter();

  return (
    <HeaderContainer>
      <XStack alignItems="center" gap="$4">
        <IconButton onPress={() => router.push("/menu")}>
          <Menu size={20} color="$color" />
        </IconButton>
        <LogoText>{title}</LogoText>
      </XStack>
      <XStack alignItems="center" gap="$4">
        <IconButton onPress={() => router.push("/notifications")}>
          <Bell size={20} color="$color" />
        </IconButton>
        <Avatar circular size="$4" onPress={() => router.push("/profile")}>
          {user?.photoURL ? (
            <Avatar.Image src={user.photoURL} />
          ) : (
            <Avatar.Fallback backgroundColor="$blue10Light" />
          )}
        </Avatar>
      </XStack>
    </HeaderContainer>
  );
};
