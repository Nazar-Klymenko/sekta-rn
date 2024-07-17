// src/pages/EventDetailsPage.tsx
import { Calendar, CreditCard, MapPin } from "@tamagui/lucide-icons";

import React from "react";

import { ActivityIndicator } from "react-native";

import { useEvent } from "@/hooks/useEvents";

import { format } from "date-fns";
import { useLocalSearchParams } from "expo-router";
import {
  Button,
  Circle,
  Image,
  Paragraph,
  ScrollView,
  Text,
  XStack,
  YStack,
} from "tamagui";

import { PageContainer } from "@/components/PageContainer";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";

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
        <ActivityIndicator color="$accentColor" />
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

  const formattedDate = format(new Date(event.date), "EEEE, MMMM do yyyy");
  const formattedTime = format(new Date(event.date), "h:mm a");

  return (
    <PageContainer>
      <YStack gap="$4">
        <Image
          source={{ uri: event.image.publicUrl }}
          aspectRatio={16 / 9}
          borderRadius="$2"
        />
        <YStack gap="$2">
          <Text fontSize="$8" fontWeight="bold">
            {event.title}
          </Text>
          <YStack gap="$2">
            <XStack alignItems="center" gap="$2">
              <YStack
                width={60}
                height={60}
                backgroundColor="$gray6"
                borderRadius="$4"
                justifyContent="center"
                alignItems="center"
              >
                <Calendar color="$accentColor" size={30} />
              </YStack>
              <YStack>
                <Text fontSize="$4" fontWeight="bold">
                  {formattedDate}
                </Text>
                <Text fontSize="$4" fontWeight="bold" color="$gray10">
                  {formattedTime}
                </Text>
              </YStack>
            </XStack>
            <XStack alignItems="center" gap="$2">
              <YStack
                width={60}
                height={60}
                backgroundColor="$gray6"
                borderRadius="$4"
                justifyContent="center"
                alignItems="center"
              >
                <MapPin color="$accentColor" size={30} />
              </YStack>
              <Text fontSize="$4" fontWeight="bold">
                {event?.location || "Nowa 3/3, Kraków"}
              </Text>
            </XStack>
            <XStack alignItems="center" gap="$2">
              <YStack
                width={60}
                height={60}
                backgroundColor="$gray6"
                borderRadius="$4"
                justifyContent="center"
                alignItems="center"
              >
                <CreditCard color="$accentColor" size={30} />
              </YStack>
              <Text fontSize="$4" fontWeight="bold">
                {event?.price || "20.00"} PLN
              </Text>
            </XStack>
          </YStack>
        </YStack>
        <YStack>
          <Text fontSize="$6" fontWeight="bold">
            About this event
          </Text>
          <Paragraph color="$color10">{event.caption}</Paragraph>
        </YStack>

        <YStack gap="$2">
          <Text fontSize="$6" fontWeight="bold">
            Lineup
          </Text>
          <XStack flexWrap="wrap" gap="$2">
            {event.lineup.map((artist, index) => (
              <XStack
                key={index}
                backgroundColor={"$gray8Dark"}
                borderRadius="$6"
                paddingVertical="$2"
                paddingHorizontal="$4"
              >
                <Text color="white">{artist}</Text>
              </XStack>
            ))}
          </XStack>
        </YStack>
        <YStack gap="$2">
          <Text fontSize="$6" fontWeight="bold">
            Genres
          </Text>
          <XStack flexWrap="wrap" gap="$2">
            {event.genres.map((genre, index) => (
              <XStack
                key={index}
                backgroundColor={"$gray8Dark"}
                borderRadius="$6"
                paddingVertical="$2"
                paddingHorizontal="$4"
              >
                <Text color="white">{genre}</Text>
              </XStack>
            ))}
          </XStack>
        </YStack>
        <YStack>
          <PrimaryButton text="Buy ticket 🎟️" />
        </YStack>
      </YStack>
    </PageContainer>
  );
}
const getRandomColor = () => {
  const colors = [
    "$blue8",
    "$green8",
    "$yellow8",
    "$red8",
    "$purple8",
    "$pink8",
    "$orange8",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};
