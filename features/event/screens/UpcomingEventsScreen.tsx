import { LinearGradient } from "tamagui/linear-gradient";

import React from "react";

import { ActivityIndicator, FlatList } from "react-native";

import { RetryButton } from "@/shared/components/buttons/IconButtons";
import { SecondaryButton } from "@/shared/components/buttons/SecondaryButton";
import { SkeletonEventCard } from "@/shared/components/event/SkeletonEventCard";
import { SkeletonUpcomingEventCard } from "@/shared/components/event/SkeletonUpcomingEventCard";
import UpcomingEventCard from "@/shared/components/event/UpcomingEventCard";
import { PageContainer } from "@/shared/components/layout/PageContainer";
import { useAuth } from "@/shared/hooks/useAuth";
import {
  useFavoriteEventsId,
  useUpcomingEvents,
} from "@/shared/hooks/useEvents";

import { Calendar, Info } from "@tamagui/lucide-icons";

import {
  H2,
  Text,
  XStack,
  YStack,
  useTheme,
  useWindowDimensions,
} from "tamagui";

import { useRouter } from "expo-router";

export default function UpcomingEventsScreen() {
  const theme = useTheme();
  const { data: likedEvents } = useFavoriteEventsId();
  const { width: windowWidth } = useWindowDimensions();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
    isLoading,
    refetch,
  } = useUpcomingEvents();

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (status === "error") {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Text>Error: {(error as Error).message}</Text>
        <RetryButton onPress={() => refetch()} size="lg" />
      </YStack>
    );
  }

  const flattenedEvents = data?.pages.flatMap((page) => page) || [];
  if (!isLoading && flattenedEvents.length === 0) {
    return <EmptyUpcomingEvents />;
  }
  const cardWidth = windowWidth - 32; // Full width minus padding

  return (
    <PageContainer scrollable={false} fullWidth>
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 0 }} // Remove default padding
        data={isLoading ? Array(5).fill({}) : flattenedEvents}
        renderItem={({ item: event }) =>
          isLoading ? (
            <YStack
              style={{
                maxWidth: 720,
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}
            >
              <SkeletonUpcomingEventCard cardWidth={cardWidth} />
            </YStack>
          ) : (
            <YStack
              style={{
                maxWidth: 720,
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}
            >
              <UpcomingEventCard event={event} cardWidth={cardWidth} />
            </YStack>
          )
        }
        keyExtractor={(item, index) => item.id || index.toString()}
        refreshing={isLoading}
        onRefresh={refetch}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        ListHeaderComponent={<InfoBanner />}
        ListEmptyComponent={() => (
          <Text padding="$4">
            No upcoming events found. Pull to refresh or check back later.
          </Text>
        )}
        ListFooterComponent={() =>
          isFetchingNextPage ? (
            <ActivityIndicator size="large" color={theme.accentColor.get()} />
          ) : null
        }
      />
    </PageContainer>
  );
}
const EmptyUpcomingEvents = () => {
  const { user } = useAuth();

  return (
    <YStack
      flex={1}
      justifyContent="flex-start"
      alignItems="center"
      paddingVertical="$8"
      gap="$4"
    >
      <Calendar size={100} color="$gray8Light" />
      <Text fontSize="$6" fontWeight="bold" textAlign="center">
        Sorry {user?.displayName || `${user?.displayName}`}, We don't have any
        upcoming events
      </Text>
      <Text fontSize="$4" textAlign="center" color="$gray10Light">
        Come back later, and enable push notifications to not miss any new
        events
      </Text>
    </YStack>
  );
};
const InfoBanner = () => {
  return (
    <YStack margin="$4">
      <LinearGradient
        colors={["$pink9Light", "$accentBackground"]}
        start={[0, 0]}
        end={[1, 1]}
        borderRadius="$4"
        padding={2}
      >
        <XStack
          backgroundColor="$backgroundHover"
          paddingVertical="$3"
          paddingHorizontal="$4"
          borderRadius="$3" // Slightly smaller to fit inside the gradient
          alignItems="center"
          gap="$2"
        >
          <Info size={20} />
          <YStack gap="$1">
            <Text paddingLeft="$2" fontSize={16} fontWeight="bold">
              Get a discount at the entrance!
            </Text>
            <Text paddingLeft="$2" fontSize="$3" color="$gray10Light">
              Click the attend button in the event and show it at the entrance!
            </Text>
          </YStack>
        </XStack>
      </LinearGradient>
    </YStack>
  );
};