import { formatFirestoreTimestamp } from "@/utils/formatFirestoreTimestamp";
import { createColumnHelper } from "@tanstack/react-table";

import React from "react";

import { Link, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Circle, Paragraph, YStack } from "tamagui";

import { Plus } from "@tamagui/lucide-icons";

import { FullPageLoading } from "@/features/core/components/layout/FullPageLoading";
import { PageContainer } from "@/features/core/components/layout/PageContainer";
import { Table } from "@/features/core/components/tables/Table";
import { useFetchAllResidents } from "@/features/residents/hooks/useFetchAllResidents";
import { DisplayResident } from "@/features/residents/models/Resident";

const columnHelper = createColumnHelper<DisplayResident>();

export default function ResidentListScreen() {
  const router = useRouter();
  const { data: residents, isLoading, isError } = useFetchAllResidents();
  const { right, bottom } = useSafeAreaInsets();

  const columns = [
    columnHelper.display({
      id: "index",
      header: "#",
      cell: (props) => props.row.index + 1,
      footer: () => `Total: ${residents?.length}`,
      size: 60,
    }),
    columnHelper.accessor("name.display", {
      header: "Name",
      cell: (info) => info.getValue() || "-",
      sortingFn: "alphanumeric",
    }),
    columnHelper.accessor("timestamps.createdAt", {
      header: "Created At",
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
  ];

  if (isLoading) return <FullPageLoading />;
  if (isError) return <Paragraph>Error loading residents</Paragraph>;
  const handleRowClick = (resident: DisplayResident) => {
    router.push({
      pathname: "/admin/residents/[id]",
      params: {
        id: resident.id,
      },
    });
  };
  return (
    <YStack flex={1}>
      <PageContainer>
        <Table
          data={residents || []}
          columns={columns}
          pageSize={10}
          onRowClick={handleRowClick}
        />
      </PageContainer>
      <Link href={"/admin/residents/create"} asChild>
        <Circle
          position="absolute"
          bottom={bottom}
          right={right}
          size={"$6"}
          backgroundColor="$accentColor"
          elevation={4}
          pressStyle={{ scale: 0.97 }}
        >
          <Plus color="white" size="$2" />
        </Circle>
      </Link>
    </YStack>
  );
}
