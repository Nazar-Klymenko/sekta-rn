import { createColumnHelper } from "@tanstack/react-table";

import React from "react";

import { FullPageLoading } from "@/features/core/components/layout/FullPageLoading";
import { PageContainer } from "@/features/core/components/layout/PageContainer";
import { Table } from "@/features/core/components/tables/Table";
import { useFetchEvents } from "@/features/event/hooks/useFetchEvents";
import { DisplayEvent } from "@/features/event/models/Event";
import { formatFirestoreTimestamp } from "@/utils/formatFirestoreTimestamp";

import { Paragraph, YStack } from "tamagui";

import { useRouter } from "expo-router";

const columnHelper = createColumnHelper<DisplayEvent>();

export default function EventListScreen() {
  const router = useRouter();
  const { data: events, isLoading, isError } = useFetchEvents();

  const columns = [
    columnHelper.display({
      id: "index",
      header: "#",
      cell: (props) => props.row.index + 1,
      footer: () => `Total: ${events?.length}`,
      size: 60,
    }),
    columnHelper.accessor("title.display", {
      header: "Title",
      cell: (info) => info.getValue() || "-",
      sortingFn: "alphanumeric",
    }),
    columnHelper.accessor("date", {
      header: "Date",
      cell: (info) => {
        const eventTimestamp = info.getValue();
        const formattedDate = eventTimestamp
          ? formatFirestoreTimestamp(eventTimestamp, "dd.MM.yyyy")
          : "-";
        const timeAndDay = eventTimestamp
          ? formatFirestoreTimestamp(eventTimestamp, "EEEE, HH:mm")
          : "-";
        return (
          <YStack flex={1}>
            <Paragraph>{formattedDate}</Paragraph>
            <Paragraph fontSize={12} color="$color10">
              {timeAndDay}
            </Paragraph>
          </YStack>
        );
      },
      sortingFn: "datetime",
      invertSorting: true,
    }),

    columnHelper.accessor("price.amount", {
      header: "Price",
      cell: (info) => "PLN " + info.getValue() || "-",
      sortingFn: "alphanumeric",
      size: 90,
    }),
  ];

  if (isLoading) return <FullPageLoading />;
  if (isError) return <Paragraph>Error loading events</Paragraph>;
  const handleRowClick = (event: DisplayEvent) => {
    router.push({
      pathname: "/admin/events/[id]",
      params: {
        id: event.uid,
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
