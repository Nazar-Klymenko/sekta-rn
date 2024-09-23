// src/screens/UserListScreen.tsx
import { Check, Minus } from "@tamagui/lucide-icons";

import React, { useMemo, useState } from "react";

import { useUsers } from "@/hooks/useUserData";
import { UserData } from "@/models/UserData";

import { Text } from "tamagui";

import { FullPageLoading } from "@/components/layout/FullPageLoading";
import { PageContainer } from "@/components/layout/PageContainer";
import { Column, GenericTable } from "@/components/tables/GenericTable";

const ITEMS_PER_PAGE = 10;

const columns: Column<UserData>[] = [
  { header: "Username", accessor: "username" },
  { header: "Email", accessor: "email" },
  { header: "Full Name", accessor: "fullName" },
  { header: "Language", accessor: "language" },
  {
    header: "Agree ToS",
    accessor: "agreeTos",
    render: (value: boolean) => (value ? <Check /> : <Minus />),
  },
  {
    header: "Agree Email",
    accessor: "agreeEmail",
    render: (value: boolean) => (value ? <Check /> : <Minus />),
  },
  {
    header: "Is Admin",
    accessor: "isAdmin",
    render: (value: boolean) => (value ? <Check /> : <Minus />),
  },
];

export default function UserListScreen() {
  const { data: users, isLoading, isError } = useUsers();
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return users?.slice(startIndex, startIndex + ITEMS_PER_PAGE) || [];
  }, [users, currentPage]);

  const totalPages = Math.ceil((users?.length || 0) / ITEMS_PER_PAGE);

  if (isLoading) return <FullPageLoading />;
  if (isError) return <Text>Error loading users</Text>;

  return (
    <PageContainer fullWidth padding="$4">
      <GenericTable
        data={paginatedUsers}
        columns={columns}
        // currentPage={currentPage}
        // totalPages={totalPages}
        // setCurrentPage={setCurrentPage}
      />
    </PageContainer>
  );
}
