import React from "react";

import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  useWindowDimensions,
} from "react-native";

import { RetryButton } from "@/shared/components/buttons/IconButtons";
import { EventCard } from "@/shared/components/event/EventCard";
import PreviousEventCard from "@/shared/components/event/PreviousEventCard";
import { SkeletonEventCard } from "@/shared/components/event/SkeletonEventCard";
import { SkeletonPreviousEventCard } from "@/shared/components/event/SkeletonPreviousEventCard";
import { SkeletonUpcomingEventCard } from "@/shared/components/event/SkeletonUpcomingEventCard";
import UpcomingEventCard from "@/shared/components/event/UpcomingEventCard";
import { PageContainer } from "@/shared/components/layout/PageContainer";
import {
  useFavoriteEventsId,
  usePreviousEventsPreview,
  useUpcomingEventsPreview,
} from "@/shared/hooks/useEvents";
import { usePreviousEvents, useUpcomingEvents } from "@/shared/hooks/useEvents";
import { Event } from "@/shared/models/Event";

import { ChevronRight } from "@tamagui/lucide-icons";

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

import { Link, useRouter } from "expo-router";

export default function EventListScreen() {
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
            <Pressable
              onPress={() => router.push("/events/upcoming")}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <XStack alignItems="center" gap="$2">
                <Text>View all</Text>
                <ChevronRight />
              </XStack>
            </Pressable>
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
            <Pressable
              onPress={() => router.push("/events/previous")}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <XStack alignItems="center" gap="$2">
                <Text>View all</Text>
                <ChevronRight />
              </XStack>
            </Pressable>
          </XStack>
        </XStack>
        <YStack paddingHorizontal="$4">
          {isPreviousEventsLoading
            ? Array(4)
                .fill(null)
                .map((_, index) => (
                  <YStack
                    key={index}
                    style={{
                      maxWidth: 720,
                      paddingVertical: 8,
                    }}
                  >
                    <SkeletonPreviousEventCard />
                  </YStack>
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
