import React from "react";

import { RefreshControl } from "react-native";

import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { Button, SizableText, View, YStack, styled } from "tamagui";

import { Calendar } from "@tamagui/lucide-icons";

import { FullPageLoading } from "@/features/core/components/layout/FullPageLoading";
import { PageContainer } from "@/features/core/components/layout/PageContainer";

import EmptyEventList from "../../components/EmptyEventList";
import ErrorEventList from "../../components/ErrorEventList";
import { useFetchEvent } from "../../hooks/useFetchEvent";
import EventDescription from "./EventDescription";
import EventHero from "./EventHero";
import EventInfo from "./EventInfo";
import { StickyBottomButton } from "./StickyBottomButton";
import { TagSection } from "./TagSection";

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: event, isLoading, isError } = useFetchEvent(id);

  if (isLoading)
    return (
      <PageContainer>
        <FullPageLoading />
      </PageContainer>
    );

  if (isError || !event)
    return (
      <YStack padding="$4" alignItems="center" gap="$4">
        <SizableText>Failed to load resident details.</SizableText>
        <Button>Retry</Button>
      </YStack>
    );

  const showBottomButton = event.date.toDate() > new Date();
  return (
    <>
      <PageContainer contentContainerStyle={{ padding: 0 }}>
        <YStack gap="$4">
          <ImageStyled
            source={{
              uri: event?.image?.publicUrl,
            }}
          />
          <YStack
            paddingHorizontal="$4"
            paddingBottom={showBottomButton ? "$13" : "$4"}
            gap="$4"
          >
            <EventInfo event={event} />
            <EventDescription description={event.caption} />
            {event.lineup.length > 0 && (
              <TagSection title="Lineup" tags={event.lineup} />
            )}
            {event.genres.length > 0 && (
              <TagSection title="Genres" tags={event.genres} />
            )}
          </YStack>
        </YStack>
      </PageContainer>
      {showBottomButton && (
        <StickyButtonWrap>
          <StickyBottomButton />
        </StickyButtonWrap>
      )}
    </>
  );
}
const ImageStyled = styled(Image, {
  aspectRatio: 1,
  objectFit: "cover",
  maxWidth: 724,
  borderRadius: "$2",
  width: "100%",
  flex: 1,
});

export const StickyButtonWrap = styled(View, {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "$background",
  padding: "$4",
  borderTopWidth: 1,
  borderTopColor: "$borderColor",
});
