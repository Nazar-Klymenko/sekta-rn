import React from "react";

import { Pressable } from "react-native";

import { Table } from "@/features/core/components/Table";

import { Minus } from "@tamagui/lucide-icons";

import { Paragraph, ScrollView, YStack } from "tamagui";

import { useRouter } from "expo-router";

export type Column<T> = {
  header: string;
  accessor: keyof T;
  render?: (value: any) => React.ReactNode;
};

interface GenericTableProps<T> {
  data: T[];
  columns: Column<T>[];
}

export function GenericTable<T extends { id: string }>({
  data,
  columns,
}: GenericTableProps<T>) {
  const router = useRouter();
  const renderCell = ({ item, column }: { item: T; column: Column<T> }) => {
    const value = item[column.accessor];
    const isEmpty = value === null || value === undefined;

    const content = isEmpty ? (
      <Minus size={16} />
    ) : column.render ? (
      column.render(value)
    ) : (
      value.toString()
    );

    return <Paragraph fontSize="$3">{content}</Paragraph>;
  };

  const handleRowPress = (item: T) => {
    router.navigate({
      pathname: "/admin/events/[id]",
      params: { id: item.id },
    });
  };

  return (
    <YStack>
      <ScrollView horizontal>
        <Table>
          <Table.Head>
            <Table.Row isHeader>
              {columns.map((column) => (
                <Table.HeaderCell key={column.accessor as string}>
                  <Paragraph fontSize="$3" fontWeight="bold">
                    {column.header}
                  </Paragraph>
                </Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {data.map((item) => (
              <Pressable key={item.id} onPress={() => handleRowPress(item)}>
                <Table.Row key={item.id}>
                  {columns.map((column) => (
                    <Table.Cell key={`${item.id}-${column.accessor as string}`}>
                      {renderCell({ item, column })}
                    </Table.Cell>
                  ))}
                </Table.Row>
              </Pressable>
            ))}
          </Table.Body>
        </Table>
      </ScrollView>
    </YStack>
  );
}
