import React, { useState } from "react";

import { TouchableOpacity } from "react-native";

import { PrimaryButton } from "@/features/core/components/buttons/PrimaryButton";
import { FullPageLoading } from "@/features/core/components/layout/FullPageLoading";
import { PageContainer } from "@/features/core/components/layout/PageContainer";
import { ReanimatedPageContainer } from "@/features/core/components/layout/ReanimatedPageContainer";
import { useAnimatedScroll } from "@/features/core/hooks/useAnimatedScroll";

import {
  ArrowLeft,
  Cross,
  Delete,
  Edit3,
  MoreHorizontal,
  MoreVertical,
  X,
} from "@tamagui/lucide-icons";

import {
  AlertDialog,
  Button,
  Dialog,
  Paragraph,
  Separator,
  Stack as TStack,
  Theme,
  XStack,
  YStack,
} from "tamagui";
import { Sheet } from "tamagui";

import { Stack, useLocalSearchParams, useRouter } from "expo-router";

import { useFetchEvent } from "../../hooks/useFetchEvent";
import { TagSection } from "./TagSection";
import { EventDescription, EventHero, EventInfo } from "./index";

export default function AdminEventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: event, isLoading, isError, error } = useFetchEvent(id || "");
  const [open, setOpen] = useState(false);
  const [innerOpen, setInnerOpen] = React.useState(false);
  const router = useRouter();

  if (!id || isLoading) return <FullPageLoading />;
  if (isError)
    return (
      <ReanimatedPageContainer>
        <Paragraph>Error: {error.message}</Paragraph>
      </ReanimatedPageContainer>
    );
  if (!event)
    return (
      <ReanimatedPageContainer>
        <Paragraph>Event not found</Paragraph>
      </ReanimatedPageContainer>
    );

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerRight: () => (
            <TouchableOpacity onPress={() => setOpen(true)}>
              <MoreHorizontal color="$accentColor" />
            </TouchableOpacity>
          ),
        }}
      />
      <PageContainer gap="$4">
        <EventHero event={event} />
        <YStack padding="$4" gap="$4">
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
      <Sheet
        open={open}
        onOpenChange={setOpen}
        dismissOnSnapToBottom
        animation="medium"
        zIndex={100_000}
        snapPointsMode="fit"
      >
        <Sheet.Overlay
          key="sasdsdscxv"
          animation="quickest"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Sheet.Handle />
        <Theme name={"surface1"}>
          <Sheet.Frame
            padding="$4"
            justifyContent="center"
            alignItems="center"
            gap="$5"
          >
            <Theme name={"surface2"}>
              <TStack flex={1} width="100%">
                <Button
                  onPress={() => {
                    setOpen(false);
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
                  onPress={() => {
                    setOpen(false);
                    setInnerOpen(true);
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
          </Sheet.Frame>
        </Theme>
      </Sheet>

      <AlertDialog open={innerOpen} onOpenChange={setInnerOpen}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay
            key="overlay"
            animation="quick"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
          <Theme name={"surface1"}>
            <AlertDialog.Content
              bordered
              elevate
              key="content"
              animation={[
                "quick",
                {
                  opacity: {
                    overshootClamping: true,
                  },
                },
              ]}
              enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
              exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
              x={0}
              scale={1}
              opacity={1}
              y={0}
            >
              <YStack gap="$4">
                <AlertDialog.Title>Delete Event</AlertDialog.Title>
                <AlertDialog.Description>
                  By pressing delete, the event will be deleted permanently.
                </AlertDialog.Description>

                <Separator></Separator>
                <XStack gap="$3" justifyContent="flex-end">
                  <AlertDialog.Cancel asChild>
                    <Button
                      pressStyle={{
                        borderWidth: 0,
                        backgroundColor: "$background",
                        opacity: 0.7,
                      }}
                    >
                      Cancel
                    </Button>
                  </AlertDialog.Cancel>
                  <AlertDialog.Action asChild>
                    <Button
                      theme="active"
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
                  </AlertDialog.Action>
                </XStack>
              </YStack>
            </AlertDialog.Content>
          </Theme>
        </AlertDialog.Portal>
      </AlertDialog>
    </>
  );
}
