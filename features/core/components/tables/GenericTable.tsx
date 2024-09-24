import React from "react";

import { Table } from "@/features/core/components/Table";

import { Minus } from "@tamagui/lucide-icons";

import { ScrollView, SizableText, YStack } from "tamagui";

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

    return <SizableText fontSize="$3">{content}</SizableText>;
  };

  return (
    <YStack f={1}>
      <ScrollView horizontal>
        <Table>
          <Table.Head>
            <Table.Row isHeader>
              {columns.map((column) => (
                <Table.HeaderCell key={column.accessor as string}>
                  <SizableText fontSize="$3" fontWeight="bold">
                    {column.header}
                  </SizableText>
                </Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {data.map((item) => (
              <Table.Row key={item.id}>
                {columns.map((column) => (
                  <Table.Cell key={`${item.id}-${column.accessor as string}`}>
                    {renderCell({ item, column })}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </ScrollView>
    </YStack>
  );
}
