import { InfiniteData } from "@tanstack/react-query";

import React from "react";

import { ScrollView } from "react-native";

import SectionHeaderWithAction from "@/features/core/components/SectionHeaderWithAction";
import { SkeletonUpcomingEventCard } from "@/features/event/components/event/SkeletonUpcomingEventCard";
import UpcomingEventCard from "@/features/event/components/event/UpcomingEventCard";
import { Event } from "@/features/event/models/Event";

import { getTokens } from "@tamagui/core";
import { Calendar } from "@tamagui/lucide-icons";

import { YStack } from "tamagui";

import EmptyEventList from "../../components/EmptyEventList";

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

  if (!isUpcomingLoading) {
    if (
      !upcomingEvents?.pages ||
      upcomingEvents.pages.every((page) => page.length === 0)
    ) {
      return (
        <>
          <SectionHeaderWithAction
            title="Upcoming Events"
            onActionPress={onViewAllPress}
            paddingHorizontal={16}
          />
          <EmptyEventList
            icon={Calendar}
            title={"Sorry, We don't have any upcoming events!"}
            description={
              "Come back later, and enable push notifications to not miss any new events"
            }
          />
        </>
      );
    }
  }
  const fullWidthCard = upcomingEvents?.pages[0].length === 1;
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
              .map((_, index) => <SkeletonUpcomingEventCard key={index} />)
          : upcomingEvents?.pages[0].map((event, index) => (
              <UpcomingEventCard
                event={event}
                verticalView={fullWidthCard}
                key={index}
              />
            ))}
      </ScrollView>
    </YStack>
  );
};
