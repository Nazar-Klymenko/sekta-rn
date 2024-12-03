import React, { useState } from "react";

import { RefreshControl, TouchableOpacity } from "react-native";

import { FullPageLoading } from "@/features/core/components/layout/FullPageLoading";
import { PageContainer } from "@/features/core/components/layout/PageContainer";
import { ReanimatedPageContainer } from "@/features/core/components/layout/ReanimatedPageContainer";
import { useFetchEvent } from "@/features/event/hooks/useFetchEvent";
import {
  EventDescription,
  EventHero,
  EventInfo,
  TagSection,
} from "@/features/event/screens/EventDetailsScreen";
import { InfoItem } from "@/features/event/screens/EventDetailsScreen/InfoItem";
import { formatFirestoreTimestamp } from "@/utils/formatFirestoreTimestamp";

import {
  CalendarCog,
  CalendarPlus,
  Captions,
  Hash,
  Link,
  Link2,
  MoreHorizontal,
} from "@tamagui/lucide-icons";
import { useToastController } from "@tamagui/toast";

import { H6, Paragraph, YStack } from "tamagui";
import { Separator } from "tamagui";

import { Stack, useLocalSearchParams, useRouter } from "expo-router";

import { useDeleteEvent } from "../../hooks/useDeleteEvent";
import { InnerMenuSheet } from "./InnerMenuSheet";
import { OuterMenuSheet } from "./OuterMenuSheet";

export default function EventPreviewScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const {
    data: event,
    isLoading,
    isError,
    error,
    isRefetching,
    refetch,
  } = useFetchEvent(id || "");
  const { mutate, isPending } = useDeleteEvent(id);
  const toast = useToastController();
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
          router.back();
        },
        onError: () => {
          setShowConfirmSheet(false);
          setInnerShowConfirmSheet(false);
        },
      }
    );
  };
  const createdAtDate = formatFirestoreTimestamp(
    event.createdAt,
    "EEEE, MMMM do yyyy"
  );
  const createdAtTime = formatFirestoreTimestamp(event.createdAt, "HH:mm");

  const updatedAtDate = formatFirestoreTimestamp(
    event.updatedAt,
    "EEEE, MMMM do yyyy"
  );
  const createdTime = formatFirestoreTimestamp(event.updatedAt, "HH:mm");

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
      <ReanimatedPageContainer
        fullWidth={false}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
      >
        <YStack gap="$4">
          <EventHero event={event} />
          <YStack paddingHorizontal="$4" paddingBottom={"$4"} gap="$4">
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

            <Separator />
            <H6>Debugging</H6>
            <InfoItem
              icon={<Hash color="$accentColor" size={24} />}
              title="Event id:"
              value={event.id}
            />
            <InfoItem
              icon={<CalendarPlus color="$accentColor" size={24} />}
              title="Created at:"
              value={`${createdAtDate} • ${createdAtTime}`}
            />
            <InfoItem
              icon={<CalendarCog color="$accentColor" size={24} />}
              title="Last updated at:"
              value={`${updatedAtDate} • ${createdTime}`}
            />
            <H6>Image debugging</H6>
            <InfoItem
              icon={<Hash color="$accentColor" size={24} />}
              title="Image id:"
              value={event.image.id}
            />
            <InfoItem
              icon={<Link2 color="$accentColor" size={24} />}
              title="Image Path:"
              value={event.image.path}
            />
            <InfoItem
              icon={<Link color="$accentColor" size={24} />}
              title="Public Image URL:"
              value={event.image.publicUrl}
            />
            <InfoItem
              icon={<Captions color="$accentColor" size={24} />}
              title="Alt Text Image:"
              value={event.image.altText || "No alt text provided"}
            />
          </YStack>
        </YStack>
      </ReanimatedPageContainer>

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
