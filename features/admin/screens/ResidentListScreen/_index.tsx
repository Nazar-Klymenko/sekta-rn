import React, { useMemo, useState } from "react";

import { Table } from "@/features/core/components/Table";
import { Form } from "@/features/core/components/form/Form";
import { Input } from "@/features/core/components/form/Input";
import { FullPageLoading } from "@/features/core/components/layout/FullPageLoading";
import { PageContainer } from "@/features/core/components/layout/PageContainer";
import { Pagination } from "@/features/core/components/navigation/Pagination";
import { useResidents } from "@/features/residents/hooks/useResidents";
import { Resident } from "@/features/residents/models/Resident";

import { Check, Pencil, Search, X } from "@tamagui/lucide-icons";

import { Button, ScrollView, Text, XStack, YStack } from "tamagui";

import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

const ITEMS_PER_PAGE = 10;

type Column = {
  header: string;
  accessor: keyof Resident | string;
  render?: (value: any, resident: Resident) => React.ReactNode;
};

const columns: Column[] = [
  { header: "Display Name", accessor: "displayName" },
  { header: "Email", accessor: "email" },
  { header: "Phone", accessor: "phone" },
  {
    header: "Social Media",
    accessor: "socialMedia",
    render: (value: Resident["socialMedia"]) => (
      <XStack gap="$2">
        {Object.entries(value).map(([platform, url]) =>
          url ? <Text key={platform}>{platform}</Text> : null,
        )}
      </XStack>
    ),
  },
  {
    header: "Genres",
    accessor: "genres",
    render: (value: string[]) => value.join(", "),
  },
  {
    header: "Locations",
    accessor: "locations",
    render: (value: string[]) => value.join(", "),
  },
  {
    header: "Actions",
    accessor: "actions",
    render: (_, resident: Resident) => (
      <Button
        icon={Pencil}
        onPress={() => router.push(`/admin/residents/${resident.id}`)}
      >
        Edit
      </Button>
    ),
  },
];

const searchResidentsSchema = yup.object().shape({
  searchQuery: yup.string(),
});
type FormValues = yup.InferType<typeof searchResidentsSchema>;

export default function ResidentListScreen() {
  const { data: residents, isLoading, isError } = useResidents();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const methods = useForm<FormValues>({
    resolver: yupResolver(searchResidentsSchema),
    defaultValues: {
      searchQuery: "",
    },
    mode: "onTouched",
  });

  const filteredResidents = useMemo(() => {
    return residents?.filter((resident) =>
      Object.values(resident).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  }, [residents, searchTerm]);

  const paginatedResidents = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredResidents?.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredResidents, currentPage]);

  const totalPages = Math.ceil(
    (filteredResidents?.length || 0) / ITEMS_PER_PAGE,
  );

  if (isLoading) return <FullPageLoading />;
  if (isError) return <Text>Error loading residents</Text>;

  const renderCell = ({ item, column }: { item: Resident; column: Column }) => {
    const value = column.accessor.includes(".")
      ? column.accessor.split(".").reduce((obj, key) => obj[key], item)
      : item[column.accessor as keyof Resident];
    return column.render ? (
      column.render(value, item)
    ) : (
      <Text>{value?.toString() || "N/A"}</Text>
    );
  };

  return (
    <PageContainer fullWidth padding="$4">
      <Text fontSize="$6" fontWeight="bold">
        All Residents
      </Text>
      <XStack alignItems="center" gap="$2">
        <Form methods={methods} flex={1}>
          <Input
            placeholder="Search residents"
            name="searchQuery"
            id="search-residents"
            label=""
            onChangeText={setSearchTerm}
            icon={Search}
          />
        </Form>
      </XStack>
      <ScrollView horizontal contentContainerStyle={{ width: "100%" }}>
        <Table>
          <Table.Head>
            <Table.Row isHeader>
              {columns.map((column) => (
                <Table.HeaderCell key={column.accessor}>
                  <Text fontWeight="bold">{column.header}</Text>
                </Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {paginatedResidents?.map((resident) => (
              <Table.Row key={resident.id}>
                {columns.map((column) => (
                  <Table.Cell
                    bordered
                    key={`${resident.id}-${column.accessor}`}
                  >
                    {renderCell({ item: resident, column })}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </ScrollView>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </PageContainer>
  );
}
