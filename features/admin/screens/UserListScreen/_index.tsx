import React, { useMemo, useState } from "react";

import { useUsers } from "@/features/users/hooks/useUsers";
import { User as UserData } from "@/features/users/models/User";

import { Check, Minus } from "@tamagui/lucide-icons";

import { Text } from "tamagui";

import { FullPageLoading } from "@/shared/components/layout/FullPageLoading";
import { PageContainer } from "@/shared/components/layout/PageContainer";
import { Column, GenericTable } from "@/shared/components/tables/GenericTable";

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
