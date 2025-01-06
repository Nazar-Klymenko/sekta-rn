import { formatFirestoreTimestamp } from "@/utils/formatFirestoreTimestamp";

import React, { useEffect, useState } from "react";

import { RefreshControl, TouchableOpacity } from "react-native";

import {
  Stack,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
import { H6, Paragraph, Portal, YStack } from "tamagui";
import { Separator } from "tamagui";

import {
  CalendarCog,
  CalendarPlus,
  Captions,
  Hash,
  Link,
  Link2,
  MoreHorizontal,
} from "@tamagui/lucide-icons";

import { ButtonCTA } from "@/features/core/components/buttons/ButtonCTA";
import { FullPageLoading } from "@/features/core/components/layout/FullPageLoading";
import { PageContainer } from "@/features/core/components/layout/PageContainer";
import { ReanimatedPageContainer } from "@/features/core/components/layout/ReanimatedPageContainer";
import { useFetchEvent } from "@/features/event/hooks/useFetchEvent";
import EventDescription from "@/features/event/screens/EventDetailsScreen/EventDescription";
import EventHero from "@/features/event/screens/EventDetailsScreen/EventHero";
import EventInfo from "@/features/event/screens/EventDetailsScreen/EventInfo";
import { InfoItem } from "@/features/event/screens/EventDetailsScreen/InfoItem";
import { TagSection } from "@/features/event/screens/EventDetailsScreen/TagSection";

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
  const [showConfirmSheet, setShowConfirmSheet] = useState(false);
  const [innershowConfirmSheet, setInnerShowConfirmSheet] = useState(false);
  const router = useRouter();
  const navigation = useNavigation();
  useEffect(() => {
    if (event) {
      navigation.setOptions({
        title: event.title.display,
        headerRight: () => (
          <TouchableOpacity onPress={() => setShowConfirmSheet(true)}>
            <MoreHorizontal color="$accentColor" />
          </TouchableOpacity>
        ),
      });
    }
  }, [navigation, event]);
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
    mutate(event, {
      onSuccess: () => {
        setShowConfirmSheet(false);
        setInnerShowConfirmSheet(false);
        router.back();
      },
      onError: () => {
        setShowConfirmSheet(false);
        setInnerShowConfirmSheet(false);
      },
    });
  };
  const createdAtDate = formatFirestoreTimestamp(
    event.timestamps.createdAt,
    "EEEE, MMMM do yyyy"
  );
  const createdAtTime = formatFirestoreTimestamp(
    event.timestamps.createdAt,
    "HH:mm"
  );

  const updatedAtDate = formatFirestoreTimestamp(
    event.timestamps.updatedAt,
    "EEEE, MMMM do yyyy"
  );
  const createdTime = formatFirestoreTimestamp(
    event.timestamps.updatedAt,
    "HH:mm"
  );

  return (
    <>
      <ReanimatedPageContainer
        fullWidth={false}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
      >
        <Stack.Screen
          options={{
            title: event.title.display,
            headerShown: true,
          }}
        />
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
              value={event.uid}
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
