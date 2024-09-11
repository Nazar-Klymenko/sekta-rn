import { ArrowRight, Bookmark, Heart } from "@tamagui/lucide-icons";

import React from "react";

import { useAuth } from "@/hooks/useAuth";
import { useFavoriteEventsId, useFavoriteEventsList } from "@/hooks/useEvents";

import { useRouter } from "expo-router";
import { Button, ScrollView, Text, XStack, YStack } from "tamagui";

import { Typography } from "@/components/Typography";
import { RetryButton } from "@/components/buttons/IconButtons";
import { EventCard } from "@/components/event/EventCard";
import { FullPageLoading } from "@/components/layout/FullPageLoading";
import { PageContainer } from "@/components/layout/PageContainer";

export default function LikedEventsPage() {
  const {
    data: favoriteEvents,
    isLoading,
    isError,
    error,
    refetch,
  } = useFavoriteEventsList();
  const { data: likedEvents } = useFavoriteEventsId();

  const router = useRouter();

  if (isLoading) return <FullPageLoading />;

  if (isError) {
    return (
      <PageContainer>
        <YStack flex={1} justifyContent="flex-start" alignItems="center">
          <Typography variant="body1">Error: {error.message}</Typography>
          <RetryButton onPress={() => refetch()} size="lg" />
        </YStack>
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
        <Button
          size="$4"
          theme="active"
          onPress={() => router.push("/")}
          icon={<ArrowRight size={16} />}
        >
          Discover Events
        </Button>
      </YStack>
    );
  };
  return (
    <PageContainer>
      <ScrollView>
        <YStack flex={1} gap="$4" padding="$4">
          <XStack flexWrap="wrap" justifyContent="space-between">
            {favoriteEvents && favoriteEvents.length > 0 ? (
              favoriteEvents.map((event) => (
                <YStack key={event.id} width="100%" marginBottom="$4">
                  <EventCard
                    event={event}
                    hrefSource="saved"
                    isLiked={likedEvents?.includes(event.id) || false}
                  />
                </YStack>
              ))
            ) : (
              <EmptyFavorites />
            )}
          </XStack>
        </YStack>
      </ScrollView>
    </PageContainer>
  );
}
