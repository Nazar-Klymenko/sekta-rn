import React from "react";

import { Separator, YStack } from "tamagui";

import SectionHeaderWithAction from "@/features/core/components/SectionHeaderWithAction";
import PreviousEventCard from "@/features/event/components/event/PreviousEventCard";
import { SkeletonPreviousEventCard } from "@/features/event/components/event/SkeletonPreviousEventCard";
import { DisplayEvent } from "@/features/event/models/Event";

interface PreviousEventsSectionProps {
  previousEvents: DisplayEvent[] | undefined;
  isPreviousEventsLoading: boolean;
  onViewAllPress: () => void;
}

export const PreviousEventsSection: React.FC<PreviousEventsSectionProps> = ({
  previousEvents,
  isPreviousEventsLoading,
  onViewAllPress,
}) => {
  return (
    <YStack gap="$4" paddingHorizontal="$4">
      <Separator />

      <SectionHeaderWithAction
        title="Previous Events"
        onActionPress={onViewAllPress}
      />

      <YStack rowGap="$4">
        {isPreviousEventsLoading
          ? Array(5)
              .fill(null)
              .map((_, index) => <SkeletonPreviousEventCard key={index} />)
          : previousEvents?.map((event) => (
              <PreviousEventCard key={event.uid} event={event} />
            ))}
      </YStack>
    </YStack>
  );
};
