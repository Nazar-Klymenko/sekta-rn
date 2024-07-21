// src/pages/EventDetailsPage.tsx
import { Calendar, CreditCard, Heart, MapPin } from "@tamagui/lucide-icons";

import React, { useState } from "react";

import { useAuth } from "@/hooks/useAuth";
import { useAddEventToCollection, useEvent } from "@/hooks/useEvents";

import { format } from "date-fns";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Button,
  Circle,
  Image,
  Paragraph,
  ScrollView,
  Spinner,
  Text,
  XStack,
  YStack,
  useTheme,
} from "tamagui";

import { PageContainer } from "@/components/PageContainer";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";

export default function EventDetailsPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: event, isLoading, isError, error } = useEvent(id || "");
  const [isLiked, setIsLiked] = useState(false);
  const theme = useTheme();
  const addEventToCollection = useAddEventToCollection();
  const { isLoggedIn } = useAuth();
  const router = useRouter();

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
        <Spinner color="$accentColor" size="large" />
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
  const handleLike = () => {
    if (!isLoggedIn) {
      router.push("/auth/login");
    } else {
      setIsLiked(!isLiked);
      addEventToCollection.mutate(event.id);
    }
  };
  const formattedDate = format(new Date(event.date), "EEEE, MMMM do yyyy");
  const formattedTime = format(new Date(event.date), "h:mm a");

  return (
    <PageContainer>
      <YStack gap="$4">
        <XStack justifyContent="space-between" alignItems="center">
          <Text fontSize="$8" fontWeight="bold">
            {event.title}
          </Text>
          <Button
            size="$5"
            circular
            icon={
              <Heart
                size={24}
                color={
                  isLiked ? theme.red10Light.get() : theme.gray10Light.get()
                }
                fill={isLiked ? theme.red10Light.get() : "transparent"}
              />
            }
            backgroundColor={isLiked ? "$red2" : "$gray2"}
            onPress={handleLike}
            pressStyle={{ scale: 0.9 }}
            animation="bouncy"
          />
        </XStack>
        <Image
          source={{ uri: event.image.publicUrl }}
          aspectRatio={16 / 9}
          borderRadius="$2"
        />
        <YStack gap="$2">
          <Text fontSize="$6" fontWeight="bold">
            Details
          </Text>
          <YStack gap="$2">
            <XStack alignItems="center" gap="$2">
              <YStack
                width={60}
                height={60}
                backgroundColor="$gray6"
                borderRadius="$2"
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
                borderRadius="$2"
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
                borderRadius="$2"
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
