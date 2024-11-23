import { createColumnHelper } from "@tanstack/react-table";

import React, { useMemo } from "react";

import { Alert, Platform } from "react-native";

import { Form } from "@/features/core/components/form/Form";
import { Input } from "@/features/core/components/form/Input";
import { FullPageLoading } from "@/features/core/components/layout/FullPageLoading";
import { PageContainer } from "@/features/core/components/layout/PageContainer";
import { Pagination } from "@/features/core/components/navigation/Pagination";
import { Table } from "@/features/core/components/tables/Table";
import { useUsers } from "@/features/users/hooks/useUsers";
import { User } from "@/features/users/models/User";

import { Check, Minus, Search, Trash2 } from "@tamagui/lucide-icons";

import { Button, Paragraph, Stack, XStack } from "tamagui";

import { useRouter } from "expo-router";
import { debounce } from "lodash";
import { useForm, useWatch } from "react-hook-form";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

const columnHelper = createColumnHelper<User>();

const searchSchema = yup.object().shape({
  searchQuery: yup.string(),
});
type FormValues = yup.InferType<typeof searchSchema>;

export default function UserListScreen() {
  const { data: users, isLoading, isError } = useUsers();
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
      footer: ({ table }) => `Total: ${users?.length}`,
      size: 60,
    }),
    columnHelper.accessor("username", {
      header: "Username",
      cell: (info) => info.getValue() || "-",
      sortingFn: "alphanumeric",
    }),
    columnHelper.accessor("email", {
      header: "Email",
      cell: (info) => info.getValue() || "-",
      sortingFn: "alphanumeric",
    }),
    columnHelper.accessor("fullName", {
      header: "Full Name",
      cell: (info) => info.getValue() || "-",
      sortingFn: "alphanumeric",
    }),
    columnHelper.accessor("language", {
      header: "Language",
      cell: (info) => info.getValue() || "-",
      sortingFn: "alphanumeric",
    }),
    columnHelper.accessor("agreeTos", {
      header: "Agree ToS",
      cell: (info) => (info.getValue() ? "✓" : "-"),
    }),
    columnHelper.accessor("agreeEmail", {
      header: "Agree Email",
      cell: (info) => (info.getValue() ? "✓" : "-"),
    }),
    columnHelper.accessor("isAdmin", {
      header: "Is Admin",
      cell: (info) => (info.getValue() ? "✓" : "-"),
    }),
  ];

  if (isLoading) return <FullPageLoading />;
  if (isError) return <Paragraph>Error loading users</Paragraph>;

  return (
    <PageContainer>
      <Stack gap="$4">
        <XStack alignItems="center" gap="$2">
          <Form methods={methods} flex={1}>
            <Input
              placeholder="Search users"
              name="searchQuery"
              label=""
              icon={Search}
            />
          </Form>
        </XStack>

        <Table data={users || []} columns={columns} pageSize={10} />
      </Stack>
    </PageContainer>
  );
}
