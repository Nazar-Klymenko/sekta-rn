// src/components/DrawerButton.tsx
import { Menu } from "@tamagui/lucide-icons";

import React from "react";

import { Pressable } from "react-native";

import { useDrawer } from "@/hooks/useDrawer";

import { Button, Stack } from "tamagui";

export const DrawerButton: React.FC = () => {
  const { openDrawer } = useDrawer();

  return (
    <Button
      unstyled
      display="flex"
      alignItems="center"
      justifyContent="center"
      onPress={openDrawer}
      marginRight="$2"
    >
      <Menu />
    </Button>
  );
};
