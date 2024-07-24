import React from "react";

import { Event } from "@/models/Event";

import { format } from "date-fns";
import { Link } from "expo-router";
import { Image, Paragraph, Text, XStack, YStack } from "tamagui";

import { Tag } from "./Tag";

interface EventCardProps {
  event: Event;
  hrefSource: "event" | "favourite";
}

export const EventCard: React.FC<EventCardProps> = ({ event, hrefSource }) => {
  const formattedDate = format(new Date(event.date), "dd/MM/yyyy HH:mm");

  return (
    <Link href={`/${hrefSource}/${event.id}`} asChild>
      <YStack
        padding="$4"
        marginVertical="$2"
        borderRadius="$2"
        backgroundColor="$backgroundStrong"
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
            <Text fontSize="$4" color="$gray10Light">
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
    </Link>
  );
};
{
  /* <YStack
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
          </YStack> */
}
