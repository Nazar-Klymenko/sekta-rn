import React from "react";

import { FullPageLoading } from "@/features/core/components/layout/FullPageLoading";
import { PageContainer } from "@/features/core/components/layout/PageContainer";
import {
  Column,
  GenericTable,
} from "@/features/core/components/tables/GenericTable";
import { useFetchPaginatedEvents } from "@/features/event/hooks/useFetchPaginatedEvents";
import { Event } from "@/features/event/models/Event";

import { Button, Paragraph, XStack, YStack } from "tamagui";

const columns: Column<Event>[] = [
  { header: "Title", accessor: "title" },
  {
    header: "Date",
    accessor: "date",
    render: (value) => value.toDate().toLocaleDateString(),
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
