import { Calendar, CreditCard, MapPin } from "@tamagui/lucide-icons";

import React, { useEffect, useState } from "react";

import { useAuth } from "@/hooks/useAuth";
import {
  useEvent,
  useFavoriteEventsId,
  useToggleEventLike,
} from "@/hooks/useEvents";
import { formatFirestoreTimestamp } from "@/utils/formatFirestoreTimestamp";

import {
  Stack,
  useLocalSearchParams,
  usePathname,
  useRouter,
} from "expo-router";
import {
  H1,
  H2,
  Image,
  Paragraph,
  Text,
  XStack,
  YStack,
  useMedia,
  useTheme,
} from "tamagui";

import { LinearGradient } from "tamagui/linear-gradient";

import { Tag } from "@/components/Tag";
import { LikeButton, ShareButton } from "@/components/buttons/IconButtons";
import { FullPageLoading } from "@/components/layout/FullPageLoading";
import { PageContainer } from "@/components/layout/PageContainer";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";

export default function EventDetailsPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: event, isLoading, isError, error } = useEvent(id || "");
  const { data: likedEvents } = useFavoriteEventsId();
  const theme = useTheme();
  const toggleLike = useToggleEventLike();
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const media = useMedia();

  const [optimisticIsLiked, setOptimisticIsLiked] = useState(false);
  const md = media.gtMd;

  useEffect(() => {
    if (likedEvents && event) {
      setOptimisticIsLiked(likedEvents.includes(event.id));
    }
  }, [likedEvents, event]);

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

  const handleLike = () => {
    if (!isLoggedIn) {
      router.push({ pathname: "/auth/login", params: { returnTo: pathname } });
    } else {
      setOptimisticIsLiked((prev) => !prev);
      toggleLike.mutate(
        { eventId: event.id, isLiked: optimisticIsLiked },
        {
          onError: () => {
            setOptimisticIsLiked((prev) => !prev);
          },
        },
      );
    }
  };

  const formattedDate = formatFirestoreTimestamp(
    event.date,
    "EEEE, MMMM do yyyy",
  );

  const formattedTime = formatFirestoreTimestamp(event.date, "HH:mm");

  const stickyBottom = (
    <PrimaryButton onPress={() => {}}>I will attend 🎟️</PrimaryButton>
  );
  return (
    <PageContainer stickyBottom={stickyBottom}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <XStack columnGap="$2">
              <LikeButton
                isLiked={optimisticIsLiked}
                handleLike={handleLike}
                size="sm"
              />
              <ShareButton size="sm" />
            </XStack>
          ),
        }}
      />
      <YStack gap="$4">
        <YStack position="relative" gap="$4">
          <Image source={{ uri: event.image.publicUrl }} aspectRatio={3 / 2} />
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
          ></XStack>
        </YStack>
        <H1 fontWeight="bold" color="white" flex={1}>
          {event.title}
        </H1>
        <XStack display="flex" flex={1} gap="$4">
          <YStack gap="$4" flex={md ? 2 : 1} width={md ? "66%" : "100%"}>
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
            <H2 fontWeight="bold">About this event</H2>
            <Paragraph color="$color10">{event.caption}</Paragraph>
            <H2 fontWeight="bold">Lineup</H2>
            <XStack flexWrap="wrap" gap="$2">
              {event.lineup.map((artist, index) => (
                <Tag tag={artist} key={index} />
              ))}
            </XStack>
            <H2 fontWeight="bold">Genres</H2>
            <XStack flexWrap="wrap" gap="$2">
              {event.genres.map((genre, index) => (
                <Tag tag={genre} key={index} />
              ))}
            </XStack>
          </YStack>
        </XStack>
      </YStack>
    </PageContainer>
  );
}

const InfoItem = ({ icon, title, value }: any) => (
  <XStack alignItems="center" gap="$3">
    <YStack
      width={50}
      height={50}
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
