import { createColumnHelper } from "@tanstack/react-table";

import React, { useMemo, useState } from "react";

import { Alert, Platform } from "react-native";

import { Table } from "@/features/core/components/Table";
import { Form } from "@/features/core/components/form/Form";
import { Input } from "@/features/core/components/form/Input";
import { FullPageLoading } from "@/features/core/components/layout/FullPageLoading";
import { PageContainer } from "@/features/core/components/layout/PageContainer";
import { Pagination } from "@/features/core/components/navigation/Pagination";
import { useDeletePlaySubmission } from "@/features/play/hooks/useDeletePlaySubmission";
import { useFetchPlaySubmissions } from "@/features/play/hooks/useFetchPlaySubmissions";
import { PlaySubmission } from "@/features/play/models/PlaySubmission";
import { formatFirestoreTimestamp } from "@/utils/formatFirestoreTimestamp";

import { Search, Trash2 } from "@tamagui/lucide-icons";

import { Button, Paragraph, ScrollView, Stack, XStack } from "tamagui";

import { useRouter } from "expo-router";
import { debounce } from "lodash";
import { useForm, useWatch } from "react-hook-form";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

const columnHelper = createColumnHelper<PlaySubmission>();

const searchSchema = yup.object().shape({
  searchQuery: yup.string(),
});
type FormValues = yup.InferType<typeof searchSchema>;

export default function SubmissionListScreen() {
  const { data: submissions, isLoading, isError } = useFetchPlaySubmissions();
  const router = useRouter();
  const methods = useForm<FormValues>({
    resolver: yupResolver(searchSchema),
    defaultValues: {
      searchQuery: "",
    },
    mode: "onTouched",
  });

  const columns = [
    columnHelper.display({
      id: "index",
      header: "#",
      cell: (props) => props.row.index + 1,
      size: 60,
    }),
    columnHelper.accessor("email", {
      header: "Email",
      cell: (info) => info.getValue() || "-",
      sortingFn: "alphanumeric",
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor("phone", {
      header: "Phone",
      cell: (info) => info.getValue() || "-",
      sortingFn: "alphanumeric",
      sortDescFirst: true,
    }),
    columnHelper.accessor("soundcloud", {
      header: "Soundcloud",
      cell: (info) => info.getValue() || "-",
      sortingFn: "alphanumeric",
    }),
    columnHelper.accessor("youtube", {
      header: "Youtube",
      cell: (info) => info.getValue() || "-",
      sortingFn: "alphanumeric",
    }),
    columnHelper.accessor("instagram", {
      header: "Instagram",
      cell: (info) => info.getValue() || "-",
      sortingFn: "alphanumeric",
    }),
    columnHelper.accessor("facebook", {
      header: "Facebook",
      cell: (info) => info.getValue() || "-",
      sortingFn: "alphanumeric",
    }),
    columnHelper.accessor("additionalInfo", {
      header: "Additional Info",
      cell: (info) => info.getValue() || "-",
      sortingFn: "alphanumeric",
    }),
    columnHelper.accessor("submittedAt", {
      header: "Submitted At",
      cell: (info) =>
        info.getValue()
          ? formatFirestoreTimestamp(
              info.getValue(),
              "EEEE, MMMM do yyyy, HH:mm"
            )
          : "-",
      sortingFn: "datetime",
      invertSorting: true,
      sortUndefined: false,
    }),
  ];

  if (isLoading) return <FullPageLoading />;
  if (isError) return <Paragraph>Error loading submissions</Paragraph>;
  const handleRowClick = (submission: PlaySubmission) => {
    router.push({
      pathname: "/admin/submissions/[id]",
      params: { id: submission.id, submission: JSON.stringify(submission) },
    });
  };

  return (
    <PageContainer>
      <Stack gap="$4">
        <XStack alignItems="center" gap="$2">
          <Form methods={methods} flex={1}>
            <Input
              placeholder="Search submissions"
              name="searchQuery"
              id="search-submissions"
              label=""
              icon={Search}
            />
          </Form>
        </XStack>

        <Table
          data={submissions || []}
          columns={columns}
          pageSize={10}
          onRowClick={handleRowClick}
        />
      </Stack>
    </PageContainer>
  );
}
