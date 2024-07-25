import { Calendar, CreditCard, Heart, MapPin } from "@tamagui/lucide-icons";

import React from "react";

import { useAuth } from "@/hooks/useAuth";
import {
  useAddEventToCollection,
  useEvent,
  useEventCollection,
  useToggleEventLike,
} from "@/hooks/useEvents";

import { format } from "date-fns";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Button,
  Image,
  Paragraph,
  Text,
  XStack,
  YStack,
  useTheme,
} from "tamagui";

import { LinearGradient } from "tamagui/linear-gradient";

import { Tag } from "@/components/Tag";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { FullPageLoading } from "@/components/layout/FullPageLoading";
import { PageContainer } from "@/components/layout/PageContainer";

export default function EventDetailsPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: event, isLoading, isError, error } = useEvent(id || "");
  const theme = useTheme();
  const toggleLike = useToggleEventLike();
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const { data: likedEvents } = useEventCollection();

  if (!id || isLoading) return <FullPageLoading />;
  if (isError)
    return (
      <PageContainer>
        <Text>Error: {error.message}</Text>
      </PageContainer>
    );
  if (!event)
    return (
      <PageContainer>
        <Text>Event not found</Text>
      </PageContainer>
    );

  const isLiked = likedEvents?.includes(event.id);
  const handleLike = () => {
    if (!isLoggedIn) {
      router.push("/auth/login");
    } else {
      toggleLike.mutate({ eventId: event.id, isLiked });
    }
  };

  const formattedDate = format(new Date(event.date), "EEEE, MMMM do yyyy");
  const formattedTime = format(new Date(event.date), "h:mm a");

  return (
    <PageContainer>
      <YStack gap="$4">
        <YStack position="relative">
          <Image source={{ uri: event.image.publicUrl }} aspectRatio={16 / 9} />
          <LinearGradient
            colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.8)"]}
            start={[0, 0]}
            end={[0, 1]}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 100,
            }}
          />
          <XStack
            position="absolute"
            bottom={10}
            left={10}
            right={10}
            justifyContent="space-between"
            alignItems="flex-end"
          >
            <YStack>
              <Text fontSize="$8" fontWeight="bold" color="white">
                {event.title}
              </Text>
            </YStack>
            <Button
              size="$5"
              circular
              icon={
                <Heart
                  size={24}
                  color={isLiked ? theme.red10Light.get() : "white"}
                  fill={isLiked ? theme.red10Light.get() : "transparent"}
                />
              }
              backgroundColor={isLiked ? "$red2" : "rgba(255, 255, 255, 0.2)"}
              onPress={handleLike}
              pressStyle={{ scale: 0.9 }}
              animation="bouncy"
            />
          </XStack>
        </YStack>

        <YStack gap="$4">
          <InfoItem
            icon={<Calendar color={theme.accentColor.get()} size={24} />}
            title="Date"
            value={`${formattedDate} • ${formattedTime}`}
          />
          <InfoItem
            icon={<MapPin color={theme.accentColor.get()} size={24} />}
            title="Location"
            value={event?.location || "Nowa 3/3, Kraków"}
          />
          <InfoItem
            icon={<CreditCard color={theme.accentColor.get()} size={24} />}
            title="Price"
            value={`${event?.price || "20.00"} PLN`}
          />
        </YStack>

        <YStack gap="$2">
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
              <Tag tag={artist} key={index} />
            ))}
          </XStack>
        </YStack>

        <YStack gap="$2">
          <Text fontSize="$6" fontWeight="bold">
            Genres
          </Text>
          <XStack flexWrap="wrap" gap="$2">
            {event.genres.map((genre, index) => (
              <Tag tag={genre} key={index} />
            ))}
          </XStack>
        </YStack>

        <PrimaryButton text="Buy ticket 🎟️" />
      </YStack>
    </PageContainer>
  );
}

const InfoItem = ({ icon, title, value }: any) => (
  <XStack alignItems="center" gap="$3">
    <YStack
      width={50}
      height={50}
      backgroundColor="$gray6"
      borderRadius="$2"
      justifyContent="center"
      alignItems="center"
    >
      {icon}
    </YStack>
    <YStack>
      <Text fontSize="$3" color="$gray10Light">
        {title}
      </Text>
      <Text fontSize="$4" fontWeight="bold">
        {value}
      </Text>
    </YStack>
  </XStack>
);
