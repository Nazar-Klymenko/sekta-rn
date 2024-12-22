import React from "react";

import { PageHead } from "@/features/core/components/PageHead";
import { FullPageLoading } from "@/features/core/components/layout/FullPageLoading";
import { PageContainer } from "@/features/core/components/layout/PageContainer.web";

import { Calendar } from "@tamagui/lucide-icons";

import { Image, Separator, Stack, XStack, YStack, useMedia } from "tamagui";

import { useLocalSearchParams } from "expo-router";

import EmptyEventList from "../../components/EmptyEventList";
import ErrorEventList from "../../components/ErrorEventList";
import { useFetchEvent } from "../../hooks/useFetchEvent";
import EventDescription from "../EventDetailsScreen/EventDescription";
import EventInfo from "../EventDetailsScreen/EventInfo";
import { TagSection } from "../EventDetailsScreen/TagSection";

export default function WebEventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const {
    data: event,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useFetchEvent(id || "");
  const media = useMedia();
  const gtMd = media.gtMd;
  if (!id || isLoading) return <FullPageLoading />;
  if (isError)
    return (
      <ErrorEventList
        onRetry={refetch}
        errorMessage={"Error loading this event."}
        isRefetching={isRefetching}
        onRefresh={refetch}
      />
    );
  if (!event)
    return (
      <PageContainer>
        <EmptyEventList
          icon={Calendar}
          title="Event not found"
          description="Pull to refresh or check back later."
        />
      </PageContainer>
    );
  return (
    <>
      <PageHead customTitle={event?.title.display} />

      <PageContainer>
        <XStack
          gap="$4"
          flex={1}
          flexWrap="wrap" // Allows wrapping for responsiveness
          justifyContent="center" // Centers the content on smaller screens
        >
          <Stack gap="$4" flex={gtMd ? 1 : 2} width={gtMd ? "60%" : "100%"}>
            <Image
              source={{ uri: event.image.publicUrl }}
              aspectRatio={1 / 1}
              objectFit="cover"
            />
          </Stack>
          <YStack
            paddingHorizontal={gtMd ? "$4" : 0}
            paddingBottom="$4"
            gap="$4"
            flex={gtMd ? 2 : 1}
            width={gtMd ? "35%" : "100%"}
          >
            <EventInfo event={event} />
            <Separator />
            <EventDescription description={event.caption} />
            <Separator />
            {event.lineup.length > 0 && (
              <TagSection title="Lineup" tags={event.lineup} />
            )}
            <Separator />
            {event.genres.length > 0 && (
              <TagSection title="Genres" tags={event.genres} />
            )}
          </YStack>
        </XStack>
      </PageContainer>
    </>
  );
}
