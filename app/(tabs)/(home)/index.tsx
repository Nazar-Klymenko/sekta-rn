import { useState } from "react";

import { FlatList, Platform } from "react-native";

import { useAuth } from "@/hooks/useAuth";
import {
  useEventCollection,
  useEvents,
  useLikedEvents,
} from "@/hooks/useEvents";
import { useRouterPush } from "@/hooks/useRouterPush";

import { useRouter } from "expo-router";
import { Button, Spinner, Text, View, YStack, useTheme } from "tamagui";

import { EventCard } from "@/components/EventCard";
import { FullPageLoading } from "@/components/layout/FullPageLoading";
import { PageContainer } from "@/components/layout/PageContainer";

export default function HomeScreen() {
  const theme = useTheme();

  const router = useRouter();
  const { user, isLoggedIn } = useAuth();
  const { data: events, isLoading, isError, error, refetch } = useEvents();
  const { data: likedEvents } = useEventCollection();

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
        showsVerticalScrollIndicator={Platform.OS == "web"}
        contentContainerStyle={{
          marginHorizontal: Platform.OS == "web" ? "auto" : undefined,
        }}
        data={events}
        renderItem={({ item: event }) => {
          const isLiked = likedEvents?.includes(event.id);

          return (
            <YStack
              style={{
                maxWidth: 720,
              }}
            >
              <EventCard
                event={event}
                hrefSource="event"
                isLiked={isLiked || false}
              />
            </YStack>
          );
        }}
        keyExtractor={(item) => item.id}
        refreshing={isLoading}
        onRefresh={refetch}
        ListEmptyComponent={() => (
          <Text>No events found. Pull to refresh or check back later.</Text>
        )}
      />
    </PageContainer>
  );
}
