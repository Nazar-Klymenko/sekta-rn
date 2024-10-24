import React, { useState } from "react";

import { TouchableOpacity } from "react-native";

import { FullPageLoading } from "@/features/core/components/layout/FullPageLoading";
import { PageContainer } from "@/features/core/components/layout/PageContainer";
import { useFetchEvent } from "@/features/event/hooks/useFetchEvent";
import {
  EventDescription,
  EventHero,
  EventInfo,
  TagSection,
} from "@/features/event/screens/EventDetailsScreen";

import { MoreHorizontal } from "@tamagui/lucide-icons";

import { Paragraph, YStack } from "tamagui";

import { Stack, useLocalSearchParams, useRouter } from "expo-router";

import { useDeleteEvent } from "../../hooks/useDeleteEvent";
import { InnerMenuSheet } from "./InnerMenuSheet";
import { OuterMenuSheet } from "./OuterMenuSheet";

export default function EventPreviewScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: event, isLoading, isError, error } = useFetchEvent(id || "");
  const { mutate, isPending } = useDeleteEvent(id);

  const [showConfirmSheet, setShowConfirmSheet] = useState(false);
  const [innershowConfirmSheet, setInnerShowConfirmSheet] = useState(false);
  const router = useRouter();

  if (!id || isLoading) return <FullPageLoading />;
  if (isError)
    return (
      <PageContainer>
        <Paragraph>Error: {error.message}</Paragraph>
      </PageContainer>
    );
  if (!event)
    return (
      <PageContainer>
        <Paragraph>Event not found</Paragraph>
      </PageContainer>
    );

  const handleDelete = () => {
    mutate(
      { eventId: event.id, imageId: event.image.id },
      {
        onSuccess: () => {
          setShowConfirmSheet(false);
          setInnerShowConfirmSheet(false);
          router.replace("/admin/events");
        },
      }
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerRight: () => (
            <TouchableOpacity onPress={() => setShowConfirmSheet(true)}>
              <MoreHorizontal color="$accentColor" />
            </TouchableOpacity>
          ),
        }}
      />
      <PageContainer gap="$4">
        <EventHero event={event} />
        <YStack paddingVertical="$4" gap="$4">
          <EventInfo event={event} />
          <EventDescription description={event.caption} />
          {event.lineup.length > 0 && (
            <TagSection title="Lineup" tags={event.lineup} />
          )}
          {event.genres.length > 0 && (
            <TagSection title="Genres" tags={event.genres} />
          )}
        </YStack>
      </PageContainer>

      <OuterMenuSheet
        key={id + "outer"}
        open={showConfirmSheet}
        onOpenChange={setShowConfirmSheet}
        setInnerShowConfirmSheet={setInnerShowConfirmSheet}
        id={id}
      />

      <InnerMenuSheet
        key={id + "inner"}
        open={innershowConfirmSheet}
        onOpenChange={setInnerShowConfirmSheet}
        confirmFunction={handleDelete}
        isPending={isPending}
      />
    </>
  );
}
