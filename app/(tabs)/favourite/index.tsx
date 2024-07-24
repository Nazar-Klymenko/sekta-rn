// src/pages/LikedEventsPage.tsx
import React from "react";

import { FlatList, Platform } from "react-native";

import { useEventCollection, useLikedEvents } from "@/hooks/useEvents";
import { Event } from "@/models/Event";

import { useRouter } from "expo-router";
import { Spinner, Text, YStack } from "tamagui";

import { EventCard } from "@/components/EventCard";
import { FullPageLoading } from "@/components/layout/FullPageLoading";
import { PageContainer } from "@/components/layout/PageContainer";

export default function LikedEventsPage() {
  const { data: likedEvents, isLoading, isError, error } = useLikedEvents();
  const { data: likedEventss } = useEventCollection();

  const router = useRouter();

  if (isLoading) return <FullPageLoading />;

  if (isError) {
    return (
      <PageContainer>
        <Text>Error: {error.message}</Text>
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
        renderItem={({ item: event }) => {
          const isLiked = likedEventss?.includes(event.id);

          return (
            <YStack
              style={{
                maxWidth: 720,
              }}
            >
              <EventCard
                event={event}
                hrefSource="favourite"
                isLiked={isLiked || false}
              />
            </YStack>
          );
        }}
        keyExtractor={(item) => item.id}
        refreshing={isLoading}
        ListEmptyComponent={() => (
          <Text marginTop="$4">You haven't liked any events yet.</Text>
        )}
      />
    </PageContainer>
  );
}
