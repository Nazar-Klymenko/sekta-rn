// src/components/DrawerLayout.tsx
import {
  Bookmark,
  BoomBox,
  ChevronRight,
  FileText,
  HelpCircle,
  Home,
  Play,
  Save,
  SeparatorHorizontal,
  ShieldCheck,
  User,
} from "@tamagui/lucide-icons";

import React from "react";

import { FlatList, Platform } from "react-native";

import { useAuth } from "@/hooks/useAuth";
import { useDrawer } from "@/hooks/useDrawer";
import { useUserData } from "@/hooks/useUserData";

import { useRouter } from "expo-router";
import { Drawer } from "react-native-drawer-layout";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import {
  Avatar,
  Button,
  Separator,
  Text,
  XStack,
  YStack,
  styled,
  useTheme,
} from "tamagui";

import { Collapsible } from "./Collapsible";
import { PrimaryButton } from "./buttons/PrimaryButton";

const menuItems = [
  {
    title: `Home`,
    icon: Home,
  },
  {
    title: `Saved`,
    icon: Bookmark,
  },
  {
    title: `Residents`,
    icon: BoomBox,
  },

  {
    title: `Play at our venue`,
    icon: Play,
  },
];

export const DrawerLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isOpen, openDrawer, closeDrawer } = useDrawer();
  const router = useRouter();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { isLoggedIn, user } = useAuth();
  const { data: userData } = useUserData(user?.uid || "");

  const renderDrawerContent = () => (
    <SafeAreaView style={{ flex: 1 }}>
      <UserPreview
        onPress={() => {
          router.navigate("/profile");
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
            onPress={() => {
              router.navigate("/residents");
              closeDrawer();
            }}
          />
        )}
        keyExtractor={(item) => item.title}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <Collapsible title="Legal">
            <MenuItem
              title="Terms of Service"
              onPress={() => router.push("/tos")}
              icon={FileText}
            />
            <MenuItem
              title="Privacy policy"
              onPress={() => router.push("/privacy-policy")}
              icon={ShieldCheck}
            />
            <MenuItem
              title="Contact us"
              onPress={() => router.push("/profile/contact")}
              icon={HelpCircle}
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
        <PrimaryButton width="100%">Log in</PrimaryButton>
      </XStack>
    </SafeAreaView>
  );

  return (
    <Drawer
      open={isOpen}
      onOpen={openDrawer}
      onClose={closeDrawer}
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

const ResponsiveStack = styled(Button, {
  hoverStyle: {
    backgroundColor: "$backgroundHover",
  },
  pressStyle: {
    backgroundColor: "$backgroundHover",
  },
  padding: "$4",
  minHeight: 54,
  borderRadius: "$2",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  backgroundColor: "transparent",
  borderWidth: 0,
  marginBottom: 8,
});

const MenuItem = ({
  title,
  onPress,
  icon: Icon,
}: {
  title: string;
  onPress: () => void;
  icon: React.ElementType;
}) => (
  <ResponsiveStack onPress={onPress}>
    <XStack flex={1} alignItems="center" gap="$3">
      <Icon size="$1" color="$gray10Light" />
      <Text fontSize="$4">{title}</Text>
    </XStack>
  </ResponsiveStack>
);

const UserPreview = styled(XStack, {
  alignItems: "center",
  gap: "$3",
  paddingVertical: "$4",
  paddingHorizontal: "$4",
});
