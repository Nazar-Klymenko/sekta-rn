import React from "react";

import { Event } from "@/features/event/models/Event";
import { FullPageLoading } from "@/shared/components/layout/FullPageLoading";
import { PageContainer } from "@/shared/components/layout/PageContainer";
import { Column, GenericTable } from "@/shared/components/tables/GenericTable";
import { usePaginatedEvents } from "@/shared/hooks/useEvents";

import { Plus } from "@tamagui/lucide-icons";

import { Button, Text, XStack, YStack } from "tamagui";

import { Link } from "expo-router";

const columns: Column<Event>[] = [
  { header: "Title", accessor: "title" },
  {
    header: "Date",
    accessor: "date",
    render: (value) => new Date(value).toLocaleDateString(),
  },
  { header: "Location", accessor: "location" },
];

export default function AdminEventsPage() {
  const {
    data: events,
    isLoading,
    isError,
    goToNextPage,
    goToPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = usePaginatedEvents();

  if (isLoading) return <FullPageLoading />;
  if (isError) return <Text>Error loading events</Text>;

  return (
    <PageContainer fullWidth padding="$4">
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
      <YStack space="$4">
        <GenericTable data={events || []} columns={columns} />
        <XStack justifyContent="space-between">
          <Button onPress={goToPreviousPage} disabled={!hasPreviousPage}>
            Previous Page
          </Button>
          <Button onPress={goToNextPage} disabled={!hasNextPage}>
            Next Page
          </Button>
        </XStack>
      </YStack>
    </PageContainer>
  );
}
