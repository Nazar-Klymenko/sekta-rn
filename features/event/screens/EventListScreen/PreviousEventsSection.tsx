import React from "react";

import SectionHeaderWithAction from "@/features/core/components/SectionHeaderWithAction";
import PreviousEventCard from "@/features/event/components/event/PreviousEventCard";
import { SkeletonPreviousEventCard } from "@/features/event/components/event/SkeletonPreviousEventCard";
import { Event } from "@/features/event/models/Event";

import { YStack } from "tamagui";

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
      <SectionHeaderWithAction
        title="Previous Events"
        onActionPress={onViewAllPress}
      />

      <YStack marginVertical="$2">
        {isPreviousEventsLoading
          ? Array(4)
              .fill(null)
              .map((_, index) => <SkeletonPreviousEventCard key={index} />)
          : previousEvents?.map((event) => (
              <PreviousEventCard key={event.id} event={event} />
            ))}
      </YStack>
    </YStack>
  );
};
