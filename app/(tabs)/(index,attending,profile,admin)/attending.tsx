import { LinearGradient } from "tamagui/linear-gradient";

import React from "react";

import { ActivityIndicator, FlatList } from "react-native";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { RetryButton } from "@/features/core/components/buttons/IconButtons";
import { PageContainer } from "@/features/core/components/layout/PageContainer";
import { SkeletonUpcomingEventCard } from "@/features/event/components/event/SkeletonUpcomingEventCard";
import UpcomingEventCard from "@/features/event/components/event/UpcomingEventCard";
import { useUpcomingEvents } from "@/features/event/hooks/useUpcomingEvents";

import { Calendar, Info } from "@tamagui/lucide-icons";

import {
  Paragraph,
  XStack,
  YStack,
  useTheme,
  useWindowDimensions,
} from "tamagui";

import { Stack, useRouter } from "expo-router";

export default function UpcomingEventsScreen() {
  const theme = useTheme();
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
        <Paragraph>Error: {(error as Error).message}</Paragraph>
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
      <Stack.Screen
        options={{
          animation: "fade_from_bottom",
          title: "Attending Events",
          headerShown: true,
          headerStyle: {
            backgroundColor: theme.background.get(),
          },
          headerTintColor: theme.color.get(),
        }}
      />
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
          <Paragraph padding="$4">
            No upcoming events found. Pull to refresh or check back later.
          </Paragraph>
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
      <Paragraph fontSize="$6" fontWeight="bold" textAlign="center">
        Sorry {user?.displayName || `${user?.displayName}`}, We don't have any
        upcoming events
      </Paragraph>
      <Paragraph fontSize="$4" textAlign="center" color="$gray10Light">
        Come back later, and enable push notifications to not miss any new
        events
      </Paragraph>
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
            <Paragraph paddingLeft="$2" fontSize={16} fontWeight="bold">
              Get a discount at the entrance!
            </Paragraph>
            <Paragraph paddingLeft="$2" fontSize="$3" color="$gray10Light">
              Show the event you are attending at the entrance
            </Paragraph>
          </YStack>
        </XStack>
      </LinearGradient>
    </YStack>
  );
};
