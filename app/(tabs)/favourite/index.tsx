// src/pages/LikedEventsPage.tsx
import React from "react";

import { FlatList, Platform } from "react-native";

import { useLikedEvents } from "@/hooks/useEvents";
import { Event } from "@/models/Event";

import { useRouter } from "expo-router";
import { Spinner, Text, YStack } from "tamagui";

import { EventCard } from "@/components/EventCard";
import { FullPageLoading } from "@/components/layout/FullPageLoading";
import { PageContainer } from "@/components/layout/PageContainer";

export default function LikedEventsPage() {
  const { data: likedEvents, isLoading, isError, error } = useLikedEvents();
  const router = useRouter();

  if (isLoading) return <FullPageLoading />;

  if (isError) {
    return (
      <PageContainer>
        <Text>Error: {error.message}</Text>
      </PageContainer>
    );
  }

  if (!likedEvents || likedEvents.length === 0) {
    return (
      <PageContainer>
        <Text>You haven't liked any events yet.</Text>
      </PageContainer>
    );
  }

  return (
    <PageContainer scrollable={false} fullWidth>
      <FlatList
        style={{ flex: 1, width: "100%" }}
        contentContainerStyle={{
          marginHorizontal: Platform.OS == "web" ? "auto" : undefined,
        }}
        data={likedEvents}
        renderItem={({ item: event }) => (
          <YStack
            style={{
              maxWidth: 720,
            }}
          >
            <EventCard
              event={event}
              onPress={() => router.push(`/event/${event.id}`)}
            />
          </YStack>
        )}
        keyExtractor={(item) => item.id}
        refreshing={isLoading}
        ListEmptyComponent={() => (
          <Text>No events found. Pull to refresh or check back later.</Text>
        )}
      />
    </PageContainer>
  );
}
