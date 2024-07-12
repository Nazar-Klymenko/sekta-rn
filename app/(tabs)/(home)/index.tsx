import { FlatList } from "react-native";

import { useAuth } from "@/hooks/useAuth";
import { useEvents } from "@/hooks/useEvents";
import { useRouterPush } from "@/hooks/useRouterPush";

import { useRouter } from "expo-router";
import { Button, Text, View, YStack, useTheme } from "tamagui";

import { EventCard } from "@/components/EventCard";
import { PageContainer } from "@/components/PageContainer";

export default function HomeScreen() {
  const theme = useTheme();

  const router = useRouter();
  const { user, isLoggedIn } = useAuth();
  const { data: events, isLoading, isError, error, refetch } = useEvents();
  console.log(events);
  if (isLoading) {
    return (
      <PageContainer>
        <Text>Loading events...</Text>
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
  const Test = () => {
    if (user) {
      return <Text>Welcome, {user.email}</Text>;
    } else {
      return <Text>Please log in</Text>;
    }
  };

  return (
    <PageContainer>
      <Text>Home Screen</Text> <Test></Test>
      <YStack flex={1}>
        <FlatList
          data={events}
          renderItem={({ item: event }) => (
            <EventCard
              event={event}
              onPress={() => router.push(`/event/${event.id}`)}
            />
          )}
          keyExtractor={(item) => item.id}
          refreshing={isLoading}
          onRefresh={refetch}
        />
      </YStack>
    </PageContainer>
  );
}
