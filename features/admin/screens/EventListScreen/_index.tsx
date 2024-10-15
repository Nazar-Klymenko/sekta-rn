import React from "react";

import { FullPageLoading } from "@/features/core/components/layout/FullPageLoading";
import { PageContainer } from "@/features/core/components/layout/PageContainer";
import {
  Column,
  GenericTable,
} from "@/features/core/components/tables/GenericTable";
import { useFetchPaginatedEvents } from "@/features/event/hooks/useFetchPaginatedEvents";
import { Event } from "@/features/event/models/Event";

import { Plus } from "@tamagui/lucide-icons";

import { Button, Paragraph, XStack, YStack } from "tamagui";

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

export default function EventListScreen() {
  const {
    data: events,
    isLoading,
    isError,
    goToNextPage,
    goToPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useFetchPaginatedEvents();

  if (isLoading) return <FullPageLoading />;
  if (isError) return <Paragraph>Error loading events</Paragraph>;

  return (
    <PageContainer>
      <XStack
        justifyContent="space-between"
        alignItems="center"
        paddingBottom="$4"
      >
        <Paragraph fontSize="$6" fontWeight="bold">
          Events
        </Paragraph>
        <Link href="/admin/events/create" asChild>
          <Button icon={Plus}>Create New Event</Button>
        </Link>
      </XStack>
      <YStack gap="$4">
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
