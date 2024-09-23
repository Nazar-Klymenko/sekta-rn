import React from "react";

import { Platform } from "react-native";

import { Text, YStack, useTheme } from "tamagui";

import { Stack } from "expo-router";

import { PageContainer } from "@/components/layout/PageContainer";

import { PlayForm } from "./Form";
import { HeroSection } from "./Hero";
import { VenueInfoSection } from "./Venue";

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
      <HeroSection />
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

        <PlayForm />
      </YStack>
    </PageContainer>
  );
}
