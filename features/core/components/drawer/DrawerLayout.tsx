import React from "react";

import { FlatList, Platform } from "react-native";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { useCustomNavigation } from "@/features/core/hooks/useCustomNavigation";
import { useDrawer } from "@/features/core/hooks/useDrawer";
import { useUserData } from "@/features/users/hooks/useUserData";

import { BoomBox, Play, User } from "@tamagui/lucide-icons";

import {
  Avatar,
  Paragraph,
  Separator,
  XStack,
  YStack,
  styled,
  useTheme,
} from "tamagui";

import { useRouter } from "expo-router";
import { useSegments as useExpoRouterSegments } from "expo-router";
import { Drawer } from "react-native-drawer-layout";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { MenuItem } from "../buttons/MenuItem";

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
  const { user } = useAuth();
  const { data: userData } = useUserData(user?.uid || "");
  const { navigate } = useCustomNavigation(closeDrawer);
  const segments = useExpoRouterSegments();
  const isInAuthModal = isAuthRoute(segments);

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
              backgroundColor="$accentBackground"
              justifyContent="center"
              alignItems="center"
            >
              <User size={24} color="$color" />
            </Avatar.Fallback>
          )}
        </Avatar>
        <YStack>
          <Paragraph fontSize="$4" fontWeight="bold">
            {userData?.username || user?.displayName || "Guest"}
          </Paragraph>
          <Paragraph fontSize="$3" color="$gray10Light">
            {user?.email || "Not logged in"}
          </Paragraph>
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
          />
        )}
        keyExtractor={(item) => item.title}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 16,
          paddingHorizontal: 16,
          paddingBottom: Platform.OS === "ios" ? insets.bottom + 16 : 36,
        }}
      />
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
