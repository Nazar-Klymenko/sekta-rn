// src/screens/UserListScreen.tsx
import { Check, Search, X, Minus } from "@tamagui/lucide-icons";
import React, { useMemo, useState } from "react";
import { useUsers } from "@/hooks/useUserData";
import { UserData } from "@/models/UserData";
import { Button, Text, XStack, YStack, ScrollView } from "tamagui";
import { Table } from "@/components/Table";
import { PageContainer } from "@/components/layout/PageContainer";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "@/components/form/Form";
import { Input } from "@/components/form/Input";
import { Pagination } from "@/components/navigation/Pagination";
import { FullPageLoading } from "@/components/layout/FullPageLoading";

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
      value ? <Check /> : <Minus color="$red9Light" />,
  },
  {
    header: "Agree Email",
    accessor: "agreeEmail",
    render: (value: boolean) =>
      value ? <Check /> : <Minus color="$red9Light" />,
  },
  {
    header: "Is Admin",
    accessor: "isAdmin",
    render: (value: boolean) => (value ? <Check /> : <X color="$red9Light" />),
  },
];

const searchEventsSchema = yup.object().shape({
  searchQuery: yup.string(),
});
type FormValues = yup.InferType<typeof searchEventsSchema>;

export default function UserListScreen() {
  const { data: users, isLoading, isError } = useUsers();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const methods = useForm<FormValues>({
    resolver: yupResolver(searchEventsSchema),
    defaultValues: {
      searchQuery: "",
    },
    mode: "onTouched",
  });

  const filteredUsers = useMemo(() => {
    return users?.filter((user) =>
      Object.values(user).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  }, [users, searchTerm]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredUsers?.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredUsers, currentPage]);

  const totalPages = Math.ceil((filteredUsers?.length || 0) / ITEMS_PER_PAGE);

  if (isLoading) return <FullPageLoading />;
  if (isError) return <Text>Error loading users</Text>;

  const renderCell = ({ item, column }: { item: UserData; column: Column }) => {
    const value = item[column.accessor];
    return column.render ? (
      column.render(value)
    ) : (
      <Text fontSize={"$3"}>{value?.toString() || <Minus />}</Text>
    );
  };

  return (
    <PageContainer fullWidth padding="$4">
      <Text fontSize="$6" fontWeight="bold">
        All Users
      </Text>
      <XStack alignItems="center" gap="$2">
        <Form methods={methods} flex={1}>
          <Input
            placeholder="Search user (coming soon)"
            name="searchQuery"
            id="search-users"
            label=""
            onChangeText={setSearchTerm}
            icon={Search}
            disabled
          />
        </Form>
      </XStack>
      <ScrollView horizontal>
        <Table>
          <Table.Head>
            <Table.Row isHeader>
              {columns.map((column) => (
                <Table.HeaderCell key={column.accessor}>
                  <Text fontSize={"$3"}>{column.header}</Text>
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </PageContainer>
  );
}
