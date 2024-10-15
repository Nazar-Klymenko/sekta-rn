import React from "react";

import { Pressable, ScrollView, useWindowDimensions } from "react-native";

import SectionHeaderWithAction from "@/features/core/components/SectionHeaderWithAction";
import { SkeletonUpcomingEventCard } from "@/features/event/components/event/SkeletonUpcomingEventCard";
import UpcomingEventCard from "@/features/event/components/event/UpcomingEventCard";
import { Event } from "@/features/event/models/Event";

import { ChevronRight } from "@tamagui/lucide-icons";

import { H2, Paragraph, XStack, YStack } from "tamagui";

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
        snapToInterval={snapToInterval}
        decelerationRate="fast"
        snapToAlignment="start"
      >
        {isUpcomingLoading
          ? Array(3)
              .fill(null)
              .map((_, index) => (
                <XStack key={`skeleton-${index}`} paddingRight="$4">
                  <SkeletonUpcomingEventCard />
                </XStack>
              ))
          : upcomingEvents?.map((event, index) => (
              <XStack
                key={event.id}
                paddingRight={index === totalEvents - 1 ? 0 : "$4"}
              >
                <UpcomingEventCard event={event} isVerticalView={false} />
              </XStack>
            ))}
      </ScrollView>
    </YStack>
  );
};
