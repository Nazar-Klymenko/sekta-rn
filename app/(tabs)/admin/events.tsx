import { Plus } from "@tamagui/lucide-icons";

import React from "react";

import { FlatList, Platform } from "react-native";

import { useEvents } from "@/hooks/useEvents";
import { Event } from "@/models/Event";

import { Link } from "expo-router";
import { Button, Card, Paragraph, Text, XStack, YStack } from "tamagui";

import { FullPageLoading } from "@/components/layout/FullPageLoading";
// Assume this hook exists
import { PageContainer } from "@/components/layout/PageContainer";

export default function AdminEventsPage() {
  const { data: events, isLoading, isError } = useEvents("");

  if (isLoading) return <FullPageLoading />;
  if (isError) return <Text>Error loading events</Text>;

  const renderItem = ({ item }: { item: Event }) => (
    <Card elevate size="$4" bordered marginVertical="$2" padding="$4">
      <YStack gap="$2">
        <Text fontSize="$6" fontWeight="bold">
          {item.title}
        </Text>
        {/* <Paragraph>{item.description}</Paragraph> */}
        <Text>Date: {item.date}</Text>
        <Text>Location: {item.location}</Text>
      </YStack>
    </Card>
  );

  return (
    <PageContainer scrollable={false} fullWidth>
      <XStack
        justifyContent="space-between"
        alignItems="center"
        paddingBottom="$4"
      >
        <Text fontSize="$6" fontWeight="bold">
          Events
        </Text>
        <Link href="/admin/events/create" asChild>
          <Button icon={Plus}>Create New Event</Button>
        </Link>
      </XStack>
      <FlatList
        style={{ flex: 1, width: "100%" }}
        showsVerticalScrollIndicator={Platform.OS === "web"}
        contentContainerStyle={{
          marginHorizontal: Platform.OS === "web" ? "auto" : undefined,
        }}
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </PageContainer>
  );
}
