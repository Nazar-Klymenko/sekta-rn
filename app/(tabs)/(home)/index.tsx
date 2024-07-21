import { FlatList } from "react-native";

import { useAuth } from "@/hooks/useAuth";
import { useEvents } from "@/hooks/useEvents";
import { useRouterPush } from "@/hooks/useRouterPush";

import { useRouter } from "expo-router";
import { Button, Spinner, Text, View, YStack, useTheme } from "tamagui";

import { EventCard } from "@/components/EventCard";
import { PageContainer } from "@/components/PageContainer";

export default function HomeScreen() {
  const theme = useTheme();

  const router = useRouter();
  const { user, isLoggedIn } = useAuth();
  const { data: events, isLoading, isError, error, refetch } = useEvents();

  if (isLoading) {
    return (
      <PageContainer>
        <Spinner color="$accentColor" size="large" />
      </PageContainer>
    );
  }

  if (isError) {
    return (
      <PageContainer>
        <Text>Error: {error.message}</Text>
      </PageContainer>
    );
  }

  return (
    <FlatList
      style={{ minHeight: "100%", width: "100%", maxWidth: "100%" }}
      data={events}
      renderItem={({ item: event }) => (
        <PageContainer scrollable={false}>
          <EventCard
            event={event}
            onPress={() => router.push(`/event/${event.id}`)}
          />
          <EventCard
            event={event}
            onPress={() => router.push(`/event/${event.id}`)}
          />
          <EventCard
            event={event}
            onPress={() => router.push(`/event/${event.id}`)}
          />
          <EventCard
            event={event}
            onPress={() => router.push(`/event/${event.id}`)}
          />
          <EventCard
            event={event}
            onPress={() => router.push(`/event/${event.id}`)}
          />
        </PageContainer>
      )}
      keyExtractor={(item) => item.id}
      refreshing={isLoading}
      onRefresh={refetch}
      ListEmptyComponent={() => (
        <Text>No events found. Pull to refresh or check back later.</Text>
      )}
    />
  );
}
