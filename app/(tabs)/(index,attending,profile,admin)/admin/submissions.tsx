// src/pages/AdminPlaySubmissions.tsx
import React, { useMemo, useState } from "react";

import { Alert, Platform } from "react-native";

import { Table } from "@/shared/components/Table";
import { Form } from "@/shared/components/form/Form";
import { Input } from "@/shared/components/form/Input";
import { FullPageLoading } from "@/shared/components/layout/FullPageLoading";
import { PageContainer } from "@/shared/components/layout/PageContainer";
import { Pagination } from "@/shared/components/navigation/Pagination";
import {
  useDeletePlaySubmission,
  useFetchPlaySubmissions,
} from "@/shared/hooks/usePlay";
import { PlayData } from "@/shared/models/PlayData";
import { formatFirestoreTimestamp } from "@/utils/formatFirestoreTimestamp";

import { Search, Trash2 } from "@tamagui/lucide-icons";

import { Button, ScrollView, Text, XStack, YStack } from "tamagui";

import { useForm } from "react-hook-form";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

const ITEMS_PER_PAGE = 10;

type Column = {
  header: string;
  accessor: keyof PlayData;
  render?: (value: any) => React.ReactNode;
};

const columns: Column[] = [
  { header: "Email", accessor: "email" },
  { header: "Phone", accessor: "phone" },
  { header: "Soundcloud", accessor: "soundcloud" },
  { header: "Youtube", accessor: "youtube" },
  { header: "Instagram", accessor: "instagram" },
  { header: "Facebook", accessor: "facebook" },
  { header: "Additional info", accessor: "additionalInfo" },
  {
    header: "Submitted At",
    accessor: "submittedAt",
    render: (value: any) => (
      <Text>
        {value && formatFirestoreTimestamp(value, "EEEE, MMMM do yyyy, HH:mm")}
      </Text>
    ),
  },
];

const searchSchema = yup.object().shape({
  searchQuery: yup.string(),
});
type FormValues = yup.InferType<typeof searchSchema>;

export default function AdminPlaySubmissions() {
  const { data: submissions, isLoading, isError } = useFetchPlaySubmissions();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const deleteSubmissionMutation = useDeletePlaySubmission();

  const methods = useForm<FormValues>({
    resolver: yupResolver(searchSchema),
    defaultValues: {
      searchQuery: "",
    },
    mode: "onTouched",
  });

  const filteredSubmissions = useMemo(() => {
    return submissions?.filter((submission) =>
      Object.values(submission).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  }, [submissions, searchTerm]);

  const paginatedSubmissions = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredSubmissions?.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredSubmissions, currentPage]);

  const totalPages = Math.ceil(
    (filteredSubmissions?.length || 0) / ITEMS_PER_PAGE,
  );

  if (isLoading) return <FullPageLoading />;
  if (isError) return <Text>Error loading submissions</Text>;

  const handleDelete = (id: string) => {
    Alert.alert(
      "Delete Submission",
      "Are you sure you want to delete this submission?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => {
            deleteSubmissionMutation.mutate(id);
          },
        },
      ],
    );
  };

  const renderCell = ({ item, column }: { item: PlayData; column: Column }) => {
    const value = item[column.accessor];

    if (column.accessor === "additionalInfo") {
      return (
        <XStack flex={1} alignItems="center" height={54}>
          <Text numberOfLines={1} ellipsizeMode="tail">
            {value?.toString() || "N/A"}
          </Text>
        </XStack>
      );
    }

    return column.render ? (
      column.render(value)
    ) : (
      <Text numberOfLines={1} ellipsizeMode="tail">
        {value?.toString() || "N/A"}
      </Text>
    );
  };
  return (
    <PageContainer fullWidth padding="$4">
      <Text fontSize="$6" fontWeight="bold">
        Play Submissions
      </Text>
      <XStack alignItems="center" gap="$2">
        <Form methods={methods} flex={1}>
          <Input
            placeholder="Search submissions"
            name="searchQuery"
            id="search-submissions"
            label=""
            onChangeText={setSearchTerm}
            icon={Search}
          />
        </Form>
      </XStack>
      <ScrollView horizontal>
        <Table>
          <Table.Head>
            <Table.Row isHeader>
              {columns.map((column) => (
                <Table.HeaderCell padded key={column.accessor}>
                  <Text fontWeight="bold">{column.header}</Text>
                </Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {paginatedSubmissions?.map((submission) => (
              <Table.Row key={submission.id}>
                {columns.map((column) => (
                  <Table.Cell
                    padded
                    key={`${submission.id}-${column.accessor}`}
                  >
                    {renderCell({ item: submission, column })}
                  </Table.Cell>
                ))}
                <Table.Cell>
                  <Button
                    icon={Trash2}
                    onPress={() => handleDelete(submission.id)}
                  />
                </Table.Cell>
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
