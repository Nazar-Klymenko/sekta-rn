import React from "react";
import { useFavoriteEventsId, useFavoriteEventsList } from "@/hooks/useEvents";
import { useRouter } from "expo-router";
import { Text, YStack, XStack, ScrollView } from "tamagui";
import { EventCard } from "@/components/event/EventCard";
import { FullPageLoading } from "@/components/layout/FullPageLoading";
import { PageContainer } from "@/components/layout/PageContainer";
import { Typography } from "@/components/Typography";
import { RetryButton } from "@/components/buttons/IconButtons";

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

  return (
    <PageContainer>
      <ScrollView>
        <YStack flex={1} gap="$4" padding="$4">
          <Typography variant="h4">Favorite Events</Typography>

          <XStack flexWrap="wrap" justifyContent="space-between">
            {favoriteEvents && favoriteEvents.length > 0 ? (
              favoriteEvents.map((event) => (
                <YStack key={event.id} width="100%" marginBottom="$4">
                  <EventCard
                    event={event}
                    hrefSource="favourite"
                    isLiked={likedEvents?.includes(event.id) || false}
                  />
                </YStack>
              ))
            ) : (
              <YStack
                flex={1}
                justifyContent="center"
                alignItems="center"
                paddingVertical="$8"
              >
                <Typography variant="body1">
                  You haven't liked any events yet.
                </Typography>
              </YStack>
            )}
          </XStack>
        </YStack>
      </ScrollView>
    </PageContainer>
  );
}
