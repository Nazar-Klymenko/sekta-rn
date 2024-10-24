import React, { useState } from "react";

import { TouchableOpacity } from "react-native";

import { FullPageLoading } from "@/features/core/components/layout/FullPageLoading";
import { PageContainer } from "@/features/core/components/layout/PageContainer";
import { Sheet } from "@/features/core/components/panels/Sheet";
import { useFetchEvent } from "@/features/event/hooks/useFetchEvent";
import {
  EventDescription,
  EventHero,
  EventInfo,
  TagSection,
} from "@/features/event/screens/EventDetailsScreen";

import { Edit3, MoreHorizontal, X } from "@tamagui/lucide-icons";

import {
  Button,
  Paragraph,
  Separator,
  Stack as TStack,
  Theme,
  XStack,
  YStack,
} from "tamagui";

import { Stack, useLocalSearchParams, useRouter } from "expo-router";

export default function EventPreviewScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: event, isLoading, isError, error } = useFetchEvent(id || "");
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

      <Sheet open={showConfirmSheet} onOpenChange={setShowConfirmSheet}>
        <Theme name={"surface1"}>
          <TStack flex={1} width="100%">
            <Button
              size={"$6"}
              onPress={() => {
                setShowConfirmSheet(false);
                router.push({
                  pathname: "/admin/events/[id]/update",
                  params: { id: id },
                });
              }}
              flex={1}
              width="100%"
              backgroundColor={"$"}
              icon={Edit3}
              borderBottomRightRadius={0}
              borderBottomLeftRadius={0}
              animation="quickest"
              pressStyle={{
                borderWidth: 0,
                backgroundColor: "$background",
                opacity: 0.7,
              }}
            >
              Edit
            </Button>
            <Separator />
            <Button
              size={"$6"}
              onPress={() => {
                setInnerShowConfirmSheet(true);
              }}
              borderTopRightRadius={0}
              borderTopLeftRadius={0}
              width="100%"
              icon={X}
              color={"$red10Dark"}
              animation="lazy"
              pressStyle={{
                borderWidth: 0,
                backgroundColor: "$background",
                opacity: 0.7,
              }}
            >
              Delete
            </Button>
          </TStack>
        </Theme>
      </Sheet>

      <InnerSheet
        open={innershowConfirmSheet}
        onOpenChange={setInnerShowConfirmSheet}
        closeOuterSheet={() => setShowConfirmSheet(false)}
      />
    </>
  );
}

function InnerSheet({
  open,
  onOpenChange,
  closeOuterSheet,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  closeOuterSheet: () => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <YStack gap="$4" width="100%">
        <YStack gap="$4">
          <Paragraph size="$8" fontWeight={700}>
            Delete Event
          </Paragraph>
          <Paragraph>
            By pressing delete, the event will be deleted permanently.
          </Paragraph>
          <Separator />

          <Theme name={"surface1"}>
            <XStack flex={1} width="100%" gap="$4">
              <Button
                size={"$6"}
                onPress={() => onOpenChange(false)} // Close the inner sheet
                flex={1}
                backgroundColor={"$background"}
                animation="quickest"
                pressStyle={{
                  borderWidth: 0,
                  backgroundColor: "$background",
                  opacity: 0.7,
                }}
              >
                Cancel
              </Button>
              <Button
                size={"$6"}
                onPress={() => {
                  onOpenChange(false);
                  closeOuterSheet();
                }}
                flex={1}
                backgroundColor={"$red10Light"}
                animation="lazy"
                pressStyle={{
                  borderWidth: 0,
                  backgroundColor: "$background",
                  opacity: 0.7,
                }}
              >
                Delete
              </Button>
            </XStack>
          </Theme>
        </YStack>
      </YStack>
    </Sheet>
  );
}
