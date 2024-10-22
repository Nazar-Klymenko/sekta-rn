import { createColumnHelper } from "@tanstack/react-table";

import React from "react";

import { Table } from "@/features/core/components/Table";
import { FullPageLoading } from "@/features/core/components/layout/FullPageLoading";
import { PageContainer } from "@/features/core/components/layout/PageContainer";
import { Pagination } from "@/features/core/components/navigation/Pagination";
import { useFetchEvents } from "@/features/event/hooks/useFetchEvents";
import { useFetchPaginatedEvents } from "@/features/event/hooks/useFetchPaginatedEvents";
import { Event } from "@/features/event/models/Event";
import { formatFirestoreTimestamp } from "@/utils/formatFirestoreTimestamp";

import { Paragraph, Stack, XStack } from "tamagui";

import { useRouter } from "expo-router";

const columnHelper = createColumnHelper<Event>();

export default function EventListScreen() {
  const router = useRouter();
  const { data: events, isLoading, isError } = useFetchEvents();

  const columns = [
    columnHelper.display({
      id: "index",
      header: "#",
      cell: (props) => props.row.index + 1,
      size: 60,
    }),
    columnHelper.accessor("title", {
      header: "Title",
      cell: (info) => info.getValue() || "-",
      sortingFn: "alphanumeric",
    }),
    columnHelper.accessor("date", {
      header: "Date",
      cell: (info) =>
        info.getValue()
          ? formatFirestoreTimestamp(info.getValue(), "MMMM do, yyyy")
          : "-",
      sortingFn: "datetime",
      invertSorting: true,
    }),
    columnHelper.accessor("location", {
      header: "Location",
      cell: (info) => info.getValue() || "-",
      sortingFn: "alphanumeric",
    }),
  ];

  if (isLoading) return <FullPageLoading />;
  if (isError) return <Paragraph>Error loading events</Paragraph>;
  const handleRowClick = (event: Event) => {
    router.push({
      pathname: "/admin/events/[id]",
      params: {
        id: event.id,
      },
    });
  };
  return (
    <PageContainer>
      <Table
        data={events || []}
        columns={columns}
        pageSize={10}
        onRowClick={handleRowClick}
      />
    </PageContainer>
  );
}
