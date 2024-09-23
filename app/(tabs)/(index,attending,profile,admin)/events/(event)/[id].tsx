import { ArrowLeft, Calendar, CreditCard, MapPin } from "@tamagui/lucide-icons";

import React, { useEffect, useState } from "react";

import { StyleSheet, TouchableOpacity } from "react-native";

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
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import {
  H1,
  H2,
  Image,
  Paragraph,
  Separator,
  Text,
  XStack,
  YStack,
  useMedia,
  useTheme,
} from "tamagui";
import { Stack as TamaguiStack } from "tamagui";

import { LinearGradient } from "tamagui/linear-gradient";

import CountdownBanner from "@/components/CountDownBanner";
import { Tag } from "@/components/Tag";
import { LikeButton, ShareButton } from "@/components/buttons/IconButtons";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { FullPageLoading } from "@/components/layout/FullPageLoading";
import { ReanimatedPageContainer } from "@/components/layout/ReanimatedPageContainer";

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
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 100],
      [0, 1],
      Extrapolation.CLAMP,
    );
    return {
      opacity,
      backgroundColor: "hsla(240, 7%, 8%, 1)",
    };
  });

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
      <ReanimatedPageContainer>
        <Text>Error: {error.message}</Text>
      </ReanimatedPageContainer>
    );
  if (!event)
    return (
      <ReanimatedPageContainer>
        <Text>Event not found</Text>
      </ReanimatedPageContainer>
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
    <ReanimatedPageContainer
      scrollable
      fullWidth={false}
      stickyBottom={stickyBottom}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      contentContainerStyle={styles.scrollViewContent}
    >
      <Stack.Screen
        options={{
          headerBackground: () => (
            <Animated.View
              style={[StyleSheet.absoluteFill, headerAnimatedStyle]}
            />
          ),
          headerLeft: ({ canGoBack }) => (
            <TamaguiStack
              style={{
                backgroundColor: theme.background075.get(),
                borderWidth: 0,
                borderColor: theme.gray2Dark.get(),
                borderRadius: 20,
                padding: 6,
                marginHorizontal: 10,
                overflow: "hidden",
              }}
            >
              <TouchableOpacity onPress={() => canGoBack && router.back()}>
                <ArrowLeft />
              </TouchableOpacity>
            </TamaguiStack>
          ),
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
          <Image source={{ uri: event.image.publicUrl }} aspectRatio={3 / 3} />
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
        </YStack>

        <YStack paddingHorizontal="$4" gap="$4">
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
                value={event.price === 0 ? "FREE" : `${event.price} PLN`}
              />
              <Separator />
              <H2 fontWeight="bold">Event starts in:</H2>
              <CountdownBanner targetDate={event.date} />
              <Separator />
              <H2 fontWeight="bold">About this event</H2>
              <Paragraph color="$color10">{event.caption}</Paragraph>
              <Separator />
              <H2 fontWeight="bold">Lineup</H2>
              <XStack flexWrap="wrap" gap="$2">
                {event.lineup.map((artist, index) => (
                  <Tag tag={artist} key={index} />
                ))}
              </XStack>
              <Separator />
              <H2 fontWeight="bold">Genres</H2>
              <XStack flexWrap="wrap" gap="$2">
                {event.genres.map((genre, index) => (
                  <Tag tag={genre} key={index} />
                ))}
              </XStack>
            </YStack>
          </XStack>
        </YStack>
      </YStack>
    </ReanimatedPageContainer>
  );
}

const InfoItem = ({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) => (
  <XStack alignItems="center" gap="$3">
    <YStack
      width={50}
      height={50}
      borderRadius="$6"
      justifyContent="center"
      alignItems="center"
      backgroundColor="$backgroundHover"
      style={{ boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}
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

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: "#0e0e11",
  },
});
