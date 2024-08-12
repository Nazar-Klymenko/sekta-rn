// src/screens/UserListScreen.tsx
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Search,
  X,
} from "@tamagui/lucide-icons";

import React, { useMemo, useState } from "react";

import { useUsers } from "@/hooks/useUserData";
import { UserData } from "@/models/UserData";

import { Button, Input, ScrollView, Text, XStack, YStack } from "tamagui";

import { Table } from "@/components/Table";
import { PageContainer } from "@/components/layout/PageContainer";

const ITEMS_PER_PAGE = 10;

type Column = {
  header: string;
  accessor: keyof UserData;
  render?: (value: any) => React.ReactNode;
};

const columns: Column[] = [
  { header: "Username", accessor: "username" },
  { header: "Email", accessor: "email" },
  { header: "Full Name", accessor: "fullName" },
  { header: "Language", accessor: "language" },
  {
    header: "Agree ToS",
    accessor: "agreeTos",
    render: (value: boolean) =>
      value ? <Check color="$green9Light" /> : <X color="$red9Light" />,
  },
  {
    header: "Agree Email",
    accessor: "agreeEmail",
    render: (value: boolean) =>
      value ? <Check color="$green9Light" /> : <X color="$red9Light" />,
  },
  {
    header: "Is Admin",
    accessor: "isAdmin",
    render: (value: boolean) =>
      value ? <Check color="$green9Light" /> : <X color="$red9Light" />,
  },
  {
    header: "Deletion Requested",
    accessor: "deletionRequestedAt",
    render: (value: Date | undefined) => value?.toLocaleString() || "N/A",
  },
];

export default function UserListScreen() {
  const { data: users, isLoading, error } = useUsers();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = useMemo(() => {
    return users?.filter((user) =>
      Object.values(user).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [users, searchTerm]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredUsers?.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredUsers, currentPage]);

  const totalPages = Math.ceil((filteredUsers?.length || 0) / ITEMS_PER_PAGE);

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>An error occurred: {error.message}</Text>;

  const renderCell = ({ item, column }: { item: UserData; column: Column }) => {
    const value = item[column.accessor];
    return column.render ? column.render(value) : value?.toString() || "N/A";
  };

  return (
    <PageContainer fullWidth padding="$4">
      <Text fontSize="$6" fontWeight="bold">
        All Users
      </Text>
      <XStack alignItems="center" space="$2">
        <Search size="$1" />
        <Input
          flex={1}
          placeholder="Search users..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </XStack>
      <ScrollView horizontal>
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
            {paginatedUsers?.map((user) => (
              <Table.Row key={user.id}>
                {columns.map((column) => (
                  <Table.Cell key={`${user.id}-${column.accessor}`}>
                    {renderCell({ item: user, column })}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </ScrollView>
      <XStack justifyContent="space-between" alignItems="center">
        <Text>
          Page {currentPage} of {totalPages}
        </Text>
        <XStack gap="$2">
          <Button
            icon={ChevronLeft}
            disabled={currentPage === 1}
            onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          />
          <Button
            icon={ChevronRight}
            disabled={currentPage === totalPages}
            onPress={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          />
        </XStack>
      </XStack>
    </PageContainer>
  );
}
