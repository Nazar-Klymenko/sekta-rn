import React from "react";

import { Pressable } from "react-native";

import { Event } from "@/features/event/models/Event";
import PreviousEventCard from "@/shared/components/event/PreviousEventCard";
import { SkeletonPreviousEventCard } from "@/shared/components/event/SkeletonPreviousEventCard";

import { ChevronRight } from "@tamagui/lucide-icons";

import { H2, Text, XStack, YStack } from "tamagui";

interface PreviousEventsSectionProps {
  previousEvents: Event[] | undefined;
  isPreviousEventsLoading: boolean;
  onViewAllPress: () => void;
}

export const PreviousEventsSection: React.FC<PreviousEventsSectionProps> = ({
  previousEvents,
  isPreviousEventsLoading,
  onViewAllPress,
}) => {
  return (
    <YStack>
      <XStack
        justifyContent="space-between"
        alignItems="center"
        paddingHorizontal="$4"
      >
        <H2>Previous Events</H2>
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
      <YStack paddingHorizontal="$4">
        {isPreviousEventsLoading
          ? Array(4)
              .fill(null)
              .map((_, index) => (
                <YStack
                  key={index}
                  style={{ maxWidth: 720, paddingVertical: 8 }}
                >
                  <SkeletonPreviousEventCard />
                </YStack>
              ))
          : previousEvents?.map((event) => (
              <YStack
                key={event.id}
                style={{ maxWidth: 720, paddingVertical: 8 }}
              >
                <PreviousEventCard event={event} />
              </YStack>
            ))}
      </YStack>
    </YStack>
  );
};