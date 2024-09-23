import React from "react";

import { Platform } from "react-native";

import { Stack } from "expo-router";
import { Text, YStack, useTheme } from "tamagui";

import { PageContainer } from "@/components/layout/PageContainer";

import { EnhancedHeroSection } from "../components/Hero";
import { VenueInfoSection } from "../components/Venue";
import PlayScreenForm from "../forms/PlayScreenForm";

export default function PlayScreen() {
  const theme = useTheme();

  return (
    <PageContainer fullWidth>
      <Stack.Screen
        options={{
          animation: "fade_from_bottom",
          title: "Play",
          headerShown: true || Platform.OS !== "web",
          headerStyle: {
            backgroundColor: theme.background.get(),
          },
          headerTintColor: theme.color.get(),
        }}
      />
      <EnhancedHeroSection />
      <YStack
        backgroundColor="$background"
        padding="$4"
        flex={1}
        gap="$4"
        marginHorizontal="auto"
        width="100%"
        maxWidth={740}
      >
        <VenueInfoSection />
        <YStack gap="$2">
          <Text fontSize={24} fontWeight="bold">
            Apply to Play
          </Text>
          <Text fontSize="$4" color="$gray10Light">
            Share your details and we'll be in touch
          </Text>
        </YStack>

        <PlayScreenForm></PlayScreenForm>
      </YStack>
    </PageContainer>
  );
}
