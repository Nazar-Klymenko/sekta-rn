import React from "react";

import { Platform, TouchableOpacity } from "react-native";

import { Slot, Stack, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SizableText, useTheme } from "tamagui";

import { ToastViewport } from "@tamagui/toast";

import { ClearIcon } from "@/features/core/components/form/shared/ClearIcon";

export default function HomeLayout() {
  const theme = useTheme({ name: "surface1" });

  const { left, top, right, bottom } = useSafeAreaInsets();

  const router = useRouter();
  if (Platform.OS === "web") {
    return <Slot />;
  }
  return (
    <>
      <Stack
        screenOptions={{
          headerTitleAlign: "center",
          headerTintColor: theme.color.get(),
          headerStyle: {
            backgroundColor: theme.background.get(),
          },
          headerTitleStyle: {
            fontFamily: "LeagueSpartan_700Bold",
            fontSize: 25,
          },
          animation: "slide_from_right",
          headerRight: () => (
            <ClearIcon
              onPress={() => {
                router.navigate("/admin");
              }}
            />
          ),
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "All Play Submissions",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="[id]"
          options={{
            title: "Submission Details",
            headerShown: true,
          }}
        />
      </Stack>
      <ToastViewport
        flexDirection="column"
        top={undefined}
        left={left}
        right={right}
        bottom={bottom + 10}
      />
    </>
  );
}
