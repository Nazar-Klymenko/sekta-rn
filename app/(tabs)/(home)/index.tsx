import { FlatList, Platform } from "react-native";

import { useAuth } from "@/hooks/useAuth";
import { useEvents } from "@/hooks/useEvents";
import { useRouterPush } from "@/hooks/useRouterPush";

import { useRouter } from "expo-router";
import { Button, Spinner, Text, View, YStack, useTheme } from "tamagui";

import { EventCard } from "@/components/EventCard";
import { FullPageLoading } from "@/components/layout/FullPageLoading";
import { PageContainer } from "@/components/layout/PageContainer";

export default function HomeScreen() {
  const theme = useTheme();

  const router = useRouter();
  const { user, isLoggedIn } = useAuth();
  const { data: events, isLoading, isError, error, refetch } = useEvents();

  if (isLoading) return <FullPageLoading />;

  if (isError) {
    return (
      <PageContainer>
        <Text>Error: {error.message}</Text>
      </PageContainer>
    );
  }

  return (
    <PageContainer scrollable={false} fullWidth>
      <FlatList
        style={{ flex: 1, width: "100%" }}
        contentContainerStyle={{
          marginHorizontal: Platform.OS == "web" ? "auto" : undefined,
        }}
        data={events}
        renderItem={({ item: event }) => (
          <YStack
            style={{
              maxWidth: 720,
            }}
          >
            <EventCard
              event={event}
              onPress={() => router.push(`/event/${event.id}`)}
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
    </PageContainer>
  );
}
