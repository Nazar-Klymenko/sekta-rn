// src/pages/LikedEventsPage.tsx
import React from "react";

import { FlatList } from "react-native";

import { useLikedEvents } from "@/hooks/useEvents";
import { Event } from "@/models/Event";

import { useRouter } from "expo-router";
import { Spinner, Text, YStack } from "tamagui";

import { EventCard } from "@/components/EventCard";
import { PageContainer } from "@/components/PageContainer";

export default function LikedEventsPage() {
  const { data: likedEvents, isLoading, isError, error } = useLikedEvents();
  const router = useRouter();

  if (isLoading) {
    return (
      <PageContainer>
        <Spinner color="$accentColor" size="large" />
      </PageContainer>
    );
  }

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

  const renderEvent = ({ item }: { item: Event }) => (
    <EventCard event={item} onPress={() => router.push(`/event/${item.id}`)} />
  );

  return (
    <PageContainer>
      <YStack gap="$4">
        <Text fontSize="$8" fontWeight="bold">
          Liked Events
        </Text>
        <FlatList
          data={likedEvents}
          renderItem={renderEvent}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ gap: 16 }}
        />
      </YStack>
    </PageContainer>
  );
}
