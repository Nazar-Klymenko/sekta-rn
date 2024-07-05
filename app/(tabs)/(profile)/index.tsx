import React from "react";
import {
  YStack,
  XStack,
  Avatar,
  Button,
  Text,
  Separator,
  Stack,
  styled,
} from "tamagui";
import { ChevronRight, User } from "@tamagui/lucide-icons";
import { useAuth } from "@/hooks/useAuth";
import { useRouterPush } from "@/hooks/useRouterPush";
import { signOut } from "@/services/auth";
import { media } from "@tamagui/config/v3";

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

  return (
    <YStack f={1} padding="$4" gap="$4" backgroundColor="$background">
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
    </YStack>
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
