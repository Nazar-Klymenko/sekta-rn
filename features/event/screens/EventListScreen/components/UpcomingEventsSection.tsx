import React from "react";

import { Pressable, ScrollView, useWindowDimensions } from "react-native";

import { Event } from "@/features/event/models/Event";
import { SkeletonUpcomingEventCard } from "@/shared/components/event/SkeletonUpcomingEventCard";
import UpcomingEventCard from "@/shared/components/event/UpcomingEventCard";

import { ChevronRight } from "@tamagui/lucide-icons";

import { H2, Text, XStack, YStack } from "tamagui";

interface UpcomingEventsSectionProps {
  upcomingEvents: Event[] | undefined;
  isUpcomingLoading: boolean;
  onViewAllPress: () => void;
}

export const UpcomingEventsSection: React.FC<UpcomingEventsSectionProps> = ({
  upcomingEvents,
  isUpcomingLoading,
  onViewAllPress,
}) => {
  const { width: windowWidth } = useWindowDimensions();
  const totalEvents = upcomingEvents?.length || 0;

  const cardWidth = (windowWidth - 32) * 0.9;
  const snapToInterval = cardWidth + 16;

  return (
    <YStack>
      <XStack
        justifyContent="space-between"
        alignItems="center"
        paddingHorizontal="$4"
      >
        <H2>Upcoming Events</H2>
        <Pressable
          onPress={onViewAllPress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <XStack alignItems="center" gap="$2">
            <Text>View all</Text>
            <ChevronRight />
          </XStack>
        </Pressable>
      </XStack>
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
                paddingRight={index === totalEvents - 1 ? 0 : "$4"}
              >
                <UpcomingEventCard event={event} cardWidth={cardWidth} />
              </XStack>
            ))}
      </ScrollView>
    </YStack>
  );
};
