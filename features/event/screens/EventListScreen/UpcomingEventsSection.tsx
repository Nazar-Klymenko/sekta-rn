import { InfiniteData } from "@tanstack/react-query";

import React from "react";

import { ScrollView } from "react-native";

import SectionHeaderWithAction from "@/features/core/components/SectionHeaderWithAction";
import { SkeletonUpcomingEventCard } from "@/features/event/components/event/SkeletonUpcomingEventCard";
import UpcomingEventCard from "@/features/event/components/event/UpcomingEventCard";
import { Event } from "@/features/event/models/Event";

import { getTokens } from "@tamagui/core";

import { YStack } from "tamagui";

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
  const padding = getTokens().space.$4.val;
  return (
    <YStack>
      <SectionHeaderWithAction
        title="Upcoming Events"
        onActionPress={onViewAllPress}
        paddingHorizontal={16}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: padding,
          paddingHorizontal: padding,
          gap: padding,
        }}
        snapToInterval={0}
        decelerationRate="fast"
        snapToAlignment="center"
      >
        {isUpcomingLoading
          ? Array(3)
              .fill(null)
              .map((_, index) => <SkeletonUpcomingEventCard />)
          : upcomingEvents?.pages[0].map((event, index) => (
              <UpcomingEventCard event={event} />
            ))}
      </ScrollView>
    </YStack>
  );
};
