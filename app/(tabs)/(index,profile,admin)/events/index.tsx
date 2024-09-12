import { ChevronRight } from "@tamagui/lucide-icons";

import React from "react";

import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  useWindowDimensions,
} from "react-native";

import {
  useFavoriteEventsId,
  usePreviousEventsPreview,
  useUpcomingEventsPreview,
} from "@/hooks/useEvents";
import { usePreviousEvents, useUpcomingEvents } from "@/hooks/useEvents";
import { Event } from "@/models/Event";

import { Link, useRouter } from "expo-router";
import {
  Button,
  H1,
  H2,
  Heading,
  Separator,
  Text,
  XStack,
  YStack,
  styled,
  useTheme,
} from "tamagui";

import { RetryButton } from "@/components/buttons/IconButtons";
import { EventCard } from "@/components/event/EventCard";
import PreviousEventCard from "@/components/event/PreviousEventCard";
import { SkeletonEventCard } from "@/components/event/SkeletonEventCard";
import { SkeletonPreviousEventCard } from "@/components/event/SkeletonPreviousEventCard";
import { SkeletonUpcomingEventCard } from "@/components/event/SkeletonUpcomingEventCard";
import UpcomingEventCard from "@/components/event/UpcomingEventCard";
import { PageContainer } from "@/components/layout/PageContainer";

export default function HomeScreen() {
  const theme = useTheme();
  const { data: likedEvents } = useFavoriteEventsId();
  const router = useRouter();

  const {
    data: upcomingEvents,
    isLoading: isUpcomingLoading,
    error: upcomingError,
  } = useUpcomingEventsPreview(3);

  const {
    data: previousEvents,
    isLoading: isPreviousEventsLoading,
    error: previousEventsError,
  } = usePreviousEventsPreview(4);

  if (upcomingError || previousEventsError) {
    return (
      <YStack flex={1} justifyContent="flex-start" alignItems="center">
        <Text>
          Error: {((previousEventsError || upcomingError) as Error).message}
        </Text>
        <RetryButton
          onPress={() => {
            useUpcomingEventsPreview(3).refetch();
            usePreviousEventsPreview(4).refetch();
          }}
          size="lg"
        />
      </YStack>
    );
  }

  return (
    <PageContainer scrollable={true} fullWidth>
      <YStack gap="$4" paddingTop="$4">
        <XStack
          justifyContent="space-between"
          alignItems="center"
          paddingHorizontal="$4"
        >
          <H2>Upcoming Events</H2>
          <XStack alignItems="center" justifyContent="center" display="flex">
            <Text onPress={() => router.push("/events/upcoming")}>
              View all
            </Text>
            <ChevronRight />
          </XStack>
        </XStack>
        <UpcomingEventsScrollView
          upcomingEvents={upcomingEvents}
          isUpcomingLoading={isUpcomingLoading}
        />
        <Separator marginHorizontal="$4" />
        <XStack
          justifyContent="space-between"
          alignItems="center"
          paddingHorizontal="$4"
        >
          <H2>Previous Events</H2>
          <XStack alignItems="center" justifyContent="center" display="flex">
            <Text onPress={() => router.push("/events/previous")}>
              View all
            </Text>
            <ChevronRight />
          </XStack>
        </XStack>
        <YStack paddingHorizontal="$4">
          {isPreviousEventsLoading
            ? Array(4)
                .fill(null)
                .map((_, index) => (
                  <SkeletonPreviousEventCard key={`skeleton-${index}`} />
                ))
            : previousEvents?.map((event) => (
                <YStack
                  key={event.id}
                  style={{
                    maxWidth: 720,
                    paddingVertical: 8,
                  }}
                >
                  <PreviousEventCard event={event} />
                </YStack>
              ))}
        </YStack>
      </YStack>
    </PageContainer>
  );
}
interface UpcomingEventsScrollViewProps {
  upcomingEvents: Event[] | undefined;
  isUpcomingLoading: boolean;
  fullWidth?: boolean;
}

const UpcomingEventsScrollView: React.FC<UpcomingEventsScrollViewProps> = ({
  upcomingEvents,
  isUpcomingLoading,
  fullWidth = false,
}) => {
  const { width: windowWidth } = useWindowDimensions();
  const totalEvents = upcomingEvents?.length || 0;

  const cardWidth =
    fullWidth || totalEvents === 1
      ? windowWidth - 32 // Full width minus padding
      : (windowWidth - 32) * 0.9; // 90% of available width

  const snapToInterval = cardWidth + (fullWidth || totalEvents === 1 ? 0 : 16);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingVertical: 8,
      }}
      snapToInterval={snapToInterval}
      decelerationRate="fast"
      snapToAlignment="start"
    >
      {isUpcomingLoading
        ? Array(3)
            .fill(null)
            .map((_, index) => (
              <XStack key={`skeleton-${index}`} paddingRight="$4">
                <SkeletonUpcomingEventCard cardWidth={cardWidth} />
              </XStack>
            ))
        : upcomingEvents?.map((event, index) => (
            <XStack
              key={event.id}
              paddingRight={
                fullWidth || totalEvents === 1 || index === totalEvents - 1
                  ? 0
                  : "$4"
              }
            >
              <UpcomingEventCard event={event} cardWidth={cardWidth} />
            </XStack>
          ))}
    </ScrollView>
  );
};
