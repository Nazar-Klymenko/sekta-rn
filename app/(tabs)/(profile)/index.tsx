import { media } from "@tamagui/config/v3";
import { ChevronRight, Moon, Sun, User } from "@tamagui/lucide-icons";

import React from "react";

import { signOut } from "@/api/auth";
import { useThemeContext } from "@/context/ThemeContext";
import { useAuth } from "@/hooks/useAuth";
import { useRouterPush } from "@/hooks/useRouterPush";

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

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <Text fontSize="$5" fontWeight="bold" marginBottom="$2">
    {children}
  </Text>
);

export default function ProfileScreen() {
  const { user, isLoggedIn } = useAuth();
  const routerPushSettings = useRouterPush("/(tabs)/settings");
  const routerPushLogin = useRouterPush("/(auth)/login");
  const routerPushUsernameBridge = useRouterPush("/(auth)/username-bridge");
  const theme = useTheme();
  const { themeColor, toggleTheme } = useThemeContext();
  const isDarkMode = themeColor === "dark";

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
          {user?.displayName || "Guest"}
        </Text>
        <Text fontSize="$3" color="$gray10">
          {user?.email || "Not logged in"}
        </Text>
      </YStack>

      <Separator />

      {isLoggedIn && (
        <YStack gap="$2">
          <SectionTitle>Account</SectionTitle>
          <MenuItem
            title="Settings"
            onPress={() =>
              routerPushSettings({
                next: "settings",
                prev: "/profile",
              })
            }
          />
          <MenuItem
            title="Privacy"
            onPress={() => {
              /* Handle privacy settings */
            }}
          />
        </YStack>
      )}

      <YStack gap="$2">
        <SectionTitle>Appearance</SectionTitle>
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
      </YStack>

      <YStack gap="$2">
        <SectionTitle>Support</SectionTitle>
        <MenuItem
          title="Help Center"
          onPress={() => {
            /* Handle help center */
          }}
        />
        <MenuItem
          title="Terms of Service"
          onPress={() => {
            /* Handle terms of service */
          }}
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
            <Button
              size="$7"
              height={50}
              onPress={() => routerPushLogin()}
              pressStyle={{ scale: 0.97 }}
              animation="quick"
            >
              <Text fontSize="$5" fontWeight="bold">
                Log In
              </Text>
            </Button>
            <Button
              size="$7"
              height={50}
              onPress={() => routerPushUsernameBridge()}
              pressStyle={{ scale: 0.97 }}
              animation="quick"
            >
              <Text fontSize="$5" fontWeight="bold">
                Sign Up
              </Text>
            </Button>
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
