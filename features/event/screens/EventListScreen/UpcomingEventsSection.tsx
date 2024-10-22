import { InfiniteData } from "@tanstack/react-query";

import React from "react";

import { ScrollView } from "react-native";

import SectionHeaderWithAction from "@/features/core/components/SectionHeaderWithAction";
import { SkeletonUpcomingEventCard } from "@/features/event/components/event/SkeletonUpcomingEventCard";
import UpcomingEventCard from "@/features/event/components/event/UpcomingEventCard";
import { Event } from "@/features/event/models/Event";

import { XStack, YStack } from "tamagui";

interface UpcomingEventsSectionProps {
  upcomingEvents: InfiniteData<Event[]> | undefined;
  isUpcomingLoading: boolean;
  onViewAllPress: () => void;
}

export const UpcomingEventsSection: React.FC<UpcomingEventsSectionProps> = ({
  upcomingEvents,
  isUpcomingLoading,
  onViewAllPress,
}) => {
  const totalEvents = upcomingEvents?.pages[0].length || 0;

  return (
    <YStack>
      <SectionHeaderWithAction
        title="Upcoming Events"
        onActionPress={onViewAllPress}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: 8,
        }}
        snapToInterval={0}
        decelerationRate="fast"
        snapToAlignment="start"
      >
        {isUpcomingLoading
          ? Array(3)
              .fill(null)
              .map((_, index) => (
                <XStack key={`skeleton-${index}`} paddingRight={16}>
                  <SkeletonUpcomingEventCard />
                </XStack>
              ))
          : upcomingEvents?.pages[0].map((event, index) => (
              <XStack
                key={event.id}
                paddingRight={index === totalEvents - 1 ? 0 : 16}
              >
                <UpcomingEventCard event={event} />
              </XStack>
            ))}
      </ScrollView>
    </YStack>
  );
};
