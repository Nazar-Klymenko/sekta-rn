import React from "react";

import { FullPageLoading } from "@/features/core/components/layout/FullPageLoading";
import { PageContainer } from "@/features/core/components/layout/PageContainer.web";

import { Calendar } from "@tamagui/lucide-icons";

import { Separator, View, YStack, styled } from "tamagui";

import { useLocalSearchParams } from "expo-router";

import EmptyEventList from "../../components/EmptyEventList";
import ErrorEventList from "../../components/ErrorEventList";
import { useFetchEvent } from "../../hooks/useFetchEvent";
import { StickyBottomButton } from "../EventDetailsScreen/StickyBottomButton";
import { TagSection } from "../EventDetailsScreen/TagSection";
import {
  EventDescription,
  EventHero,
  EventInfo,
} from "../EventDetailsScreen/index";

export default function WebEventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const {
    data: event,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useFetchEvent(id || "");

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
  const showBottomButtom = true;
  return (
    <>
      <PageContainer>
        <YStack gap="$4">
          <EventHero event={event} />
          <YStack
            paddingHorizontal="$4"
            paddingBottom={showBottomButtom ? "$13" : "$4"}
            gap="$4"
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
        </YStack>
      </PageContainer>
      {showBottomButtom && <StickyBottomButton targetDate={event.date} />}
    </>
  );
}
