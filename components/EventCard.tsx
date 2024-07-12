// src/components/EventCard.tsx
import React from "react";

import { Event } from "@/models/Event";

import { format } from "date-fns";
import { Button, Image, Paragraph, Text, XStack, YStack } from "tamagui";

interface EventCardProps {
  event: Event;
  onPress: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onPress }) => {
  const formattedDate = format(new Date(event.date), "dd/MM/yyyy HH:mm");

  return (
    <YStack
      backgroundColor="$backgroundStrong"
      padding="$4"
      marginVertical="$2"
      borderRadius="$4"
      onPress={onPress}
    >
      <Image
        source={{ uri: event.image.publicUrl }}
        aspectRatio={16 / 9}
        borderRadius="$2"
      />
      <YStack space="$2" marginTop="$2">
        <XStack justifyContent="space-between" alignItems="center">
          <Text fontSize="$6" fontWeight="bold">
            {event.title}
          </Text>
          <Text fontSize="$4" color="$gray10">
            {formattedDate}
          </Text>
        </XStack>
        <Paragraph numberOfLines={2} color="$gray11">
          {event.caption}
        </Paragraph>
        <XStack flexWrap="wrap" space="$2">
          {event.lineup.map((artist, index) => (
            <Button key={index} size="$2" variant="outlined">
              {artist}
            </Button>
          ))}
        </XStack>
      </YStack>
    </YStack>
  );
};
