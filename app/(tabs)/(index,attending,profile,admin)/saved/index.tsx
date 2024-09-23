import React from "react";

import { FlatList, Platform } from "react-native";

import Typography from "@/shared/components/Typography";
import { SecondaryButton } from "@/shared/components/buttons/SecondaryButton";
import { EventCard } from "@/shared/components/event/EventCard";
import { FullPageLoading } from "@/shared/components/layout/FullPageLoading";
import { PageContainer } from "@/shared/components/layout/PageContainer";
import { useAuth } from "@/shared/hooks/useAuth";
import {
  useFavoriteEventsId,
  useFavoriteEventsList,
} from "@/shared/hooks/useEvents";
import { Event } from "@/shared/models/Event";

import { ArrowRight, Bookmark, Heart } from "@tamagui/lucide-icons";

import { Text, YStack } from "tamagui";

import { useRouter } from "expo-router";

export default function LikedEventsPage() {
  const {
    data: favoriteEvents,
    isLoading,
    isError,
    error,
  } = useFavoriteEventsList();
  const { data: likedEvents } = useFavoriteEventsId();

  const router = useRouter();

  if (isLoading) return <FullPageLoading />;

  if (isError) {
    return (
      <PageContainer>
        <Text>Error: {error.message}</Text>
      </PageContainer>
    );
  }
  const EmptyFavorites = () => {
    const router = useRouter();
    const { user } = useAuth();

    return (
      <YStack
        flex={1}
        justifyContent="center"
        alignItems="center"
        paddingVertical="$8"
        gap="$4"
      >
        <Bookmark size={100} color="$gray8Light" />
        <Typography variant="h5" textAlign="center">
          {user?.displayName ? `${user.displayName}, your` : "Your"} Saved
          events list is empty
        </Typography>
        <Typography variant="body1" textAlign="center" color="$gray10Light">
          Bookmark events to add them to your saved list and easily find them
          later.
        </Typography>
        <SecondaryButton
          size="$4"
          onPress={() => router.push("/")}
          icon={<ArrowRight size={16} />}
          text="Discover Events"
        />
      </YStack>
    );
  };
  return (
    <PageContainer scrollable={false} fullWidth>
      <FlatList
        style={{ flex: 1, width: "100%" }}
        contentContainerStyle={{
          marginHorizontal: Platform.OS == "web" ? "auto" : undefined,
        }}
        data={favoriteEvents}
        showsVerticalScrollIndicator={Platform.OS !== "web"}
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
                hrefSource="saved"
                isLiked={isLiked || false}
              />
            </YStack>
          );
        }}
        keyExtractor={(item) => item.id}
        refreshing={isLoading}
        ListEmptyComponent={() => <EmptyFavorites />}
      />
    </PageContainer>
  );
}