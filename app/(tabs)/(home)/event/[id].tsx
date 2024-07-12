// src/pages/EventDetailsPage.tsx
import React from "react";

import { useEvent } from "@/hooks/useEvents";

import { format } from "date-fns";
import { useLocalSearchParams } from "expo-router";
import {
  Button,
  Image,
  Paragraph,
  ScrollView,
  Text,
  XStack,
  YStack,
} from "tamagui";

import { PageContainer } from "@/components/PageContainer";

export default function EventDetailsPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: event, isLoading, isError, error } = useEvent(id || "");

  if (!id) {
    return (
      <PageContainer>
        <Text>No event ID provided</Text>
      </PageContainer>
    );
  }

  if (isLoading) {
    return (
      <PageContainer>
        <Text>Loading event...</Text>
      </PageContainer>
    );
  }

  if (isError) {
    return (
      <PageContainer>
        <Text>Error: {error.message}</Text>
      </PageContainer>
    );
  }

  if (!event) {
    return (
      <PageContainer>
        <Text>Event not found</Text>
      </PageContainer>
    );
  }

  const formattedDate = format(
    new Date(event.date),
    "EEEE, MMMM do yyyy 'at' h:mm a"
  );

  return (
    <PageContainer>
      <ScrollView>
        <YStack space="$4">
          <Image
            source={{ uri: event.image.publicUrl }}
            aspectRatio={16 / 9}
            borderRadius="$2"
          />
          <YStack space="$2">
            <Text fontSize="$8" fontWeight="bold">
              {event.title}
            </Text>
            <Text fontSize="$5" color="$gray10">
              {formattedDate}
            </Text>
          </YStack>
          <Paragraph>{event.caption}</Paragraph>
          <YStack space="$2">
            <Text fontSize="$6" fontWeight="bold">
              Lineup
            </Text>
            <XStack flexWrap="wrap" space="$2">
              {event.lineup.map((artist, index) => (
                <Button key={index} size="$2" variant="outlined">
                  {artist}
                </Button>
              ))}
            </XStack>
          </YStack>
          <YStack space="$2">
            <Text fontSize="$6" fontWeight="bold">
              Genres
            </Text>
            <XStack flexWrap="wrap" space="$2">
              {event.genres.map((genre, index) => (
                <Button key={index} size="$2" variant="outlined">
                  {genre}
                </Button>
              ))}
            </XStack>
          </YStack>
        </YStack>
      </ScrollView>
    </PageContainer>
  );
}
