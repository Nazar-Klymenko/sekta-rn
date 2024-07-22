// src/components/EventCard.tsx
import React from "react";

import { Event } from "@/models/Event";

import { format } from "date-fns";
import { Button, Image, Paragraph, Text, XStack, YStack } from "tamagui";

import { Tag } from "./Tag";

interface EventCardProps {
  event: Event;
  onPress: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onPress }) => {
  const formattedDate = format(new Date(event.date), "dd/MM/yyyy HH:mm");
  const formattedDayName = format(new Date(event.date), "EEE");
  const formattedDay = format(new Date(event.date), "dd/MM");
  return (
    <YStack
      // backgroundColor="$gray12Light"
      padding="$4"
      marginVertical="$2"
      borderRadius="$2"
      onPress={onPress}
      // maxWidth={720}
      // display="flex"
      // justifyContent="center"
      // width={720}
      // minWidth="100%"
      // borderWidth="$0.25"
      // borderColor="$gray11Light"
    >
      <Image
        source={{ uri: event.image.publicUrl }}
        aspectRatio={16 / 9}
        borderRadius="$2"
      />
      <YStack gap="$2" marginTop="$2">
        <XStack justifyContent="space-between" alignItems="center">
          <Text fontSize="$6" fontWeight="bold">
            {event.title}
          </Text>
          {/* <YStack
            backgroundColor="$accentBackground"
            borderRadius="$2"
            justifyContent="center"
            alignItems="center"
            padding="$2"
          >
            <Text fontSize={16} fontWeight="bold">
              {formattedDayName}
            </Text>
            <Text>{formattedDay}</Text>
          </YStack> */}
          <Text fontSize="$4" color="$gray10">
            {formattedDate}
          </Text>
        </XStack>
        <Paragraph color="$gray10Light">{event.caption}</Paragraph>

        <XStack flexWrap="wrap" gap="$2">
          {event.genres.map((genre, index) => (
            <Tag tag={genre} key={index} />
          ))}
        </XStack>
      </YStack>
    </YStack>
  );
};
