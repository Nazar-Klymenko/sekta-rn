import { media } from "@tamagui/config/v3";
import { ChevronRight, Moon, Sun, User } from "@tamagui/lucide-icons";

import React from "react";

import { signOut } from "@/api/auth";
import { useThemeContext } from "@/context/ThemeContext";
import { useAuth } from "@/hooks/useAuth";
import { useRouterPush } from "@/hooks/useRouterPush";
import { useUserData } from "@/hooks/useUserData";

import { router, useRouter } from "expo-router";
import {
  AnimatePresence,
  Avatar,
  Button,
  Separator,
  Stack,
  Text,
  Theme,
  XStack,
  YStack,
  styled,
  useTheme,
} from "tamagui";

import { PageContainer } from "@/components/PageContainer";
import { Switch } from "@/components/buttons/CustomSwitch";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { SecondaryButton } from "@/components/buttons/SecondaryButton";
import { LanguageSelect } from "@/components/form/LanguageSelect";

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <Text fontSize="$5" fontWeight="bold" marginBottom="$2">
    {children}
  </Text>
);

export default function ProfileScreen() {
  const { user, isLoggedIn } = useAuth();
  const { data: userData, isLoading, isError } = useUserData(user?.uid || "");

  const routerPushLogin = useRouterPush("/auth/login");
  const routerPushUsernameBridge = useRouterPush("/auth/username-bridge");
  const { themeColor, toggleTheme } = useThemeContext();
  const isDarkMode = themeColor === "dark";
  const router = useRouter();

  return (
    <PageContainer>
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
              <User size="$8" color="$blue1Light" />
            </Avatar.Fallback>
          )}
        </Avatar>
        <Text fontSize="$6" fontWeight="bold">
          {userData?.username || user?.displayName || "Guest"}
        </Text>
        <Text fontSize="$3" color="$gray10">
          {userData?.email || user?.email || "Not logged in"}
        </Text>
      </YStack>

      <Separator />

      {isLoggedIn && (
        <>
          <YStack gap="$2">
            <SectionTitle>Account</SectionTitle>
            <MenuItem
              title="Profile Information"
              onPress={() => router.push("/profile/profile-information")}
            />
            <MenuItem
              title="Change Password"
              onPress={() => router.push("/profile/change-password")}
            />
            <MenuItem
              title="Delete account"
              onPress={() => router.push("/profile/delete-profile")}
            />
          </YStack>
          <YStack gap="$2">
            <SectionTitle>Notifications</SectionTitle>
            <MenuItem
              title="Push notifications"
              onPress={() => router.push("/profile/push-notifications")}
            />
            <MenuItem
              title="Email notifications"
              onPress={() => router.push("/profile/email-notifications")}
            />
          </YStack>
        </>
      )}

      <YStack gap="$2">
        <SectionTitle>Preferences</SectionTitle>
        <XStack
          alignItems="center"
          justifyContent="space-between"
          backgroundColor="$background"
          padding="$4"
          borderRadius="$2"
        >
          <XStack alignItems="center" gap="$2">
            {isDarkMode ? <Moon size={24} /> : <Sun size={24} />}
            <Text fontSize="$4">{isDarkMode ? "Dark Mode" : "Light Mode"}</Text>
          </XStack>
          <Switch checked={isDarkMode} onPress={toggleTheme} />
        </XStack>

        <LanguageSelect />
      </YStack>

      <YStack gap="$2">
        <SectionTitle>Support</SectionTitle>
        <MenuItem
          title="Terms of Service"
          onPress={() => router.push("/profile/tos")}
        />
        <MenuItem
          title="Cookie policy"
          onPress={() => router.push("/profile/cookie-policy")}
        />
        <MenuItem
          title="Contact us"
          onPress={() => router.push("/profile/contact")}
        />
      </YStack>

      <YStack
        f={1}
        justifyContent="flex-end"
        alignItems="stretch"
        marginTop="$4"
      >
        {isLoggedIn ? (
          <Button
            size="$7"
            height="$6"
            backgroundColor="$red10"
            color="white"
            onPress={signOut}
            pressStyle={{ scale: 0.97 }}
            animation="quick"
          >
            <Text color="white" fontSize="$5" fontWeight="bold">
              Sign Out
            </Text>
          </Button>
        ) : (
          <YStack gap="$4">
            <PrimaryButton onPress={() => routerPushLogin()} text="Log In" />
            <SecondaryButton
              onPress={() => routerPushUsernameBridge()}
              text="Sign Up"
            />
          </YStack>
        )}
      </YStack>
    </PageContainer>
  );
}

const ResponsiveStack = styled(Stack, {
  hoverStyle: {
    backgroundColor: "$gray5",
    cursor: "pointer",
  },
  pressStyle: {
    backgroundColor: "$gray5",
  },
  padding: "$4",
  borderRadius: "$2",
});

const MenuItem = ({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) => (
  <ResponsiveStack onPress={onPress}>
    <XStack alignItems="center" justifyContent="space-between">
      <Text fontSize="$4">{title}</Text>
      <ChevronRight size="$1" />
    </XStack>
  </ResponsiveStack>
);
