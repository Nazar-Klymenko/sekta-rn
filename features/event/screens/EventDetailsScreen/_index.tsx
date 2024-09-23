// EventDetailsScreen.tsx
import React, { useEffect, useState } from "react";

import { StyleSheet } from "react-native";

import { PrimaryButton } from "@/shared/components/buttons/PrimaryButton";
import { FullPageLoading } from "@/shared/components/layout/FullPageLoading";
import { ReanimatedPageContainer } from "@/shared/components/layout/ReanimatedPageContainer";
import { useAuth } from "@/shared/hooks/useAuth";
import {
  useEvent,
  useFavoriteEventsId,
  useToggleEventLike,
} from "@/shared/hooks/useEvents";

import { Text, YStack } from "tamagui";

import { useLocalSearchParams, usePathname, useRouter } from "expo-router";

import {
  CountdownBanner,
  EventDescription,
  EventGenres,
  EventHeader,
  EventHero,
  EventInfo,
  EventLineup,
} from "./components";
import { useEventScroll } from "./components/EventHeader";

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: event, isLoading, isError, error } = useEvent(id || "");
  const { data: likedEvents } = useFavoriteEventsId();
  const toggleLike = useToggleEventLike();
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [optimisticIsLiked, setOptimisticIsLiked] = useState(false);
  const { scrollHandler, scrollEventThrottle, scrollY } = useEventScroll();

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

  const stickyBottom = (
    <PrimaryButton onPress={() => {}}>I will attend 🎟️</PrimaryButton>
  );

  return (
    <>
      <EventHeader
        optimisticIsLiked={optimisticIsLiked}
        handleLike={handleLike}
        scrollY={scrollY}
      />
      <ReanimatedPageContainer
        scrollable
        fullWidth={false}
        stickyBottom={stickyBottom}
        onScroll={scrollHandler}
        scrollEventThrottle={scrollEventThrottle}
        contentContainerStyle={styles.scrollViewContent}
      >
        <YStack gap="$4">
          <EventHero event={event} />
          <YStack paddingHorizontal="$4" gap="$4">
            <EventInfo event={event} />
            <CountdownBanner targetDate={event.date} />
            <EventDescription description={event.caption} />
            <EventLineup lineup={event.lineup} />
            <EventGenres genres={event.genres} />
          </YStack>
        </YStack>
      </ReanimatedPageContainer>
    </>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: "#0e0e11",
  },
});
