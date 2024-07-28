import { SlidersHorizontal, X } from "@tamagui/lucide-icons";

import { useCallback, useEffect, useState } from "react";

import { FlatList, Platform } from "react-native";

import { useAuth } from "@/hooks/useAuth";
import { useEventCollection, useEvents } from "@/hooks/useEvents";

import { Stack, useRouter } from "expo-router";
import {
  Adapt,
  Button,
  Checkbox,
  Dialog,
  Input,
  Label,
  Select,
  Sheet,
  Spinner,
  Text,
  View,
  XStack,
  YStack,
  useTheme,
} from "tamagui";

import { EventCard } from "@/components/event/EventCard";
import { FullPageLoading } from "@/components/layout/FullPageLoading";
import { PageContainer } from "@/components/layout/PageContainer";

export default function HomeScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { user, isLoggedIn } = useAuth();
  const { data: events, isLoading, isError, error, refetch } = useEvents();
  const { data: likedEvents } = useEventCollection();
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({
    date: "",
    genre: "",
    price: "",
    freeOnly: false,
    tags: [],
  });
  const [uniqueTags, setUniqueTags] = useState([]);

  useEffect(() => {
    if (events) {
      const tagsSet = new Set();
      events.forEach((event) => {
        event.genres.forEach((tag) => tagsSet.add(tag));
      });
      // setUniqueTags(Array.from(tagsSet));
    }
  }, [events]);

  if (isLoading) return <FullPageLoading />;
  if (isError)
    return (
      <PageContainer>
        <Text>Error: {error.message}</Text>
      </PageContainer>
    );

  const applyFilters = () => {
    // Apply filters logic here
    setOpen(false);
  };

  return (
    <PageContainer scrollable={false} fullWidth>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Button
              size="$3"
              icon={SlidersHorizontal}
              circular
              onPress={() => setOpen(true)}
              theme="active"
            />
          ),
        }}
      />
      <FlatList
        style={{ flex: 1, width: "100%" }}
        showsVerticalScrollIndicator={Platform.OS == "web"}
        contentContainerStyle={{
          marginHorizontal: Platform.OS == "web" ? "auto" : undefined,
        }}
        data={events}
        renderItem={({ item: event }) => (
          <YStack style={{ maxWidth: 720 }}>
            <EventCard
              event={event}
              hrefSource="event"
              isLiked={likedEvents?.includes(event.id) || false}
            />
          </YStack>
        )}
        keyExtractor={(item) => item.id}
        refreshing={isLoading}
        onRefresh={refetch}
        ListEmptyComponent={() => (
          <Text>No events found. Pull to refresh or check back later.</Text>
        )}
      />
      <Dialog modal open={open} onOpenChange={setOpen}>
        <Adapt when="sm" platform="touch">
          <Sheet animation="medium" zIndex={200000} modal dismissOnSnapToBottom>
            <Sheet.Frame padding="$4" gap="$4">
              <Adapt.Contents />
            </Sheet.Frame>
            <Sheet.Overlay
              animation="lazy"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
          </Sheet>
        </Adapt>

        <Dialog.Portal>
          <Dialog.Overlay
            key="overlay"
            animation="quick"
            opacity={0.5}
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />

          <Dialog.Content
            bordered
            elevate
            key="content"
            animateOnly={["transform", "opacity"]}
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
            gap="$4"
          >
            <Dialog.Title>Filter Events</Dialog.Title>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </PageContainer>
  );
}
