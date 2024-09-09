import Ionicons from "@expo/vector-icons/Ionicons";

import { PropsWithChildren, useState } from "react";

import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";

import { XStack, YStack } from "tamagui";

import { ThemedText } from "@/components/ThemedText";

export function Collapsible({
  children,
  title,
}: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? "light";

  return (
    <YStack>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
      >
        <Ionicons
          name={isOpen ? "chevron-down" : "chevron-forward-outline"}
          size={18}
        />
        <ThemedText type="defaultSemiBold">{title}</ThemedText>
      </TouchableOpacity>
      {isOpen && <YStack style={styles.content}>{children}</YStack>}
    </YStack>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    alignItems: "center",
    color: "white",
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
});
