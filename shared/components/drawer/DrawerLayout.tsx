// src/components/DrawerLayout.tsx
import React from "react";

import { FlatList, Platform, TouchableOpacity } from "react-native";

import { useSignOut } from "@/features/auth/hooks/useSignOut";
import { useAuth } from "@/features/core/hooks/useAuth";
import { useUserData } from "@/features/core/hooks/useUserData";
import { useCustomNavigation } from "@/shared/hooks/useCustomNavigation";
import { useDrawer } from "@/shared/hooks/useDrawer";

import {
  Bookmark,
  BoomBox,
  ChevronRight,
  FileText,
  HelpCircle,
  Home,
  LogOut,
  Play,
  Save,
  SeparatorHorizontal,
  ShieldCheck,
  User,
} from "@tamagui/lucide-icons";

import {
  Avatar,
  Button,
  Separator,
  Stack,
  Text,
  XStack,
  YStack,
  styled,
  useTheme,
} from "tamagui";

import { Href, useRouter } from "expo-router";
import { useSegments as useExpoRouterSegments } from "expo-router";
import { Drawer } from "react-native-drawer-layout";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { Collapsible } from "../Collapsible";
import { MenuItem } from "../buttons/MenuItem";
import { PrimaryButton } from "../buttons/PrimaryButton";

const menuItems = [
  {
    title: `Residents`,
    icon: BoomBox,
    url: "/residents",
  },
  {
    title: `Play at our venue`,
    icon: Play,
    url: "/play",
  },
];
const isAuthRoute = (segments: string[]) =>
  segments[0] === "auth" || segments[0] === "(support)";

export const DrawerLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isOpen, openDrawer, closeDrawer } = useDrawer();
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { isLoggedIn, user } = useAuth();
  const { data: userData } = useUserData(user?.uid || "");
  const signOutMutation = useSignOut();
  const { navigate } = useCustomNavigation(closeDrawer);
  const segments = useExpoRouterSegments();
  const isInAuthModal = isAuthRoute(segments);
  const handleSignOut = () => {
    signOutMutation.mutate();
    closeDrawer();
  };

  const renderDrawerContent = () => (
    <SafeAreaView style={{ flex: 1 }}>
      <UserPreview
        onPress={() => {
          router.push("/(tabs)/(profile)/profile");
          closeDrawer();
        }}
      >
        <Avatar circular size="$5">
          {user?.photoURL ? (
            <Avatar.Image src={user.photoURL} />
          ) : (
            <Avatar.Fallback
              backgroundColor="$blue10Light"
              justifyContent="center"
              alignItems="center"
            >
              <User size={24} color="$color" />
            </Avatar.Fallback>
          )}
        </Avatar>
        <YStack>
          <Text fontSize="$4" fontWeight="bold">
            {userData?.username || user?.displayName || "Guest"}
          </Text>
          <Text fontSize="$3" color="$gray10Light">
            {user?.email || "Not logged in"}
          </Text>
        </YStack>
      </UserPreview>
      <Separator marginHorizontal="$4" />

      <FlatList
        data={menuItems}
        renderItem={({ item }) => (
          <MenuItem
            title={item.title}
            icon={item.icon}
            onPress={() => navigate(item.url)}
            fontSize="$6"
          />
        )}
        keyExtractor={(item) => item.title}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <Collapsible title="Legal">
            <MenuItem
              title="Terms of Service"
              onPress={() => {
                navigate("/tos");
              }}
              icon={FileText}
              fontSize="$6"
            />
            <MenuItem
              title="Privacy policy"
              onPress={() => {
                navigate("/privacy-policy");
              }}
              icon={ShieldCheck}
              fontSize="$6"
            />
            <MenuItem
              title="Contact us"
              onPress={() => {
                navigate("/contact");
              }}
              icon={HelpCircle}
              fontSize="$6"
            />
          </Collapsible>
        }
        contentContainerStyle={{
          paddingTop: 16,
          paddingHorizontal: 16,
          paddingBottom: Platform.OS === "ios" ? insets.bottom + 16 : 36,
        }}
      />
      <Separator marginHorizontal="$4" />

      <XStack
        padding="$3"
        paddingHorizontal="$4"
        display="flex"
        justifyContent="center"
      >
        {!isLoggedIn ? (
          <PrimaryButton
            width="100%"
            onPress={() => {
              router.push("/auth/login");
              closeDrawer();
            }}
          >
            Log in
          </PrimaryButton>
        ) : (
          <MenuItem
            title="Sign Out"
            onPress={() => {
              handleSignOut();
              closeDrawer();
            }}
            icon={LogOut}
          />
        )}
      </XStack>
    </SafeAreaView>
  );

  return (
    <Drawer
      open={isOpen && !isInAuthModal}
      gestureHandlerProps={{ enabled: !isInAuthModal }}
      onOpen={openDrawer}
      onClose={closeDrawer}
      drawerType="back"
      drawerStyle={{
        backgroundColor: theme.background.get(),
        borderRightColor: theme.borderColor.get(),
        borderRightWidth: 1,
      }}
      renderDrawerContent={renderDrawerContent}
    >
      {children}
    </Drawer>
  );
};

const UserPreview = styled(XStack, {
  alignItems: "center",
  gap: "$3",
  paddingVertical: "$4",
  paddingHorizontal: "$4",
});
