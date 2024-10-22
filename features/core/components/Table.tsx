import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import React, { useState } from "react";

import { ChevronDown, ChevronUp } from "@tamagui/lucide-icons";

import {
  Button,
  Paragraph,
  ScrollView,
  Stack,
  ThemeableStack,
  XStack,
  styled,
} from "tamagui";

import { TablePagination } from "./TablePagination";

const TableWrapper = styled(Stack, {
  width: "100%",
  overflow: "hidden",
  borderRadius: "$4",
  borderWidth: 1,
  borderColor: "$borderColor",
  maxHeight: 600,
});

const TableHeader = styled(ThemeableStack, {
  backgroundColor: "$backgroundStrong",
  borderBottomWidth: 1,
  borderBottomColor: "$borderColor",
});

const TableBody = styled(ThemeableStack, {
  backgroundColor: "$background",
});

const TableRow = styled(ThemeableStack, {
  flexDirection: "row",
  borderBottomWidth: 1,
  borderBottomColor: "$borderColor",
  variants: {
    isHeader: {
      true: {
        backgroundColor: "$backgroundStrong",
      },
    },
    isHoverable: {
      true: {
        cursor: "pointer", // this will show pointer cursor on web
        hoverStyle: {
          backgroundColor: "$backgroundHover",
        },
        pressStyle: {
          opacity: 0.7,
        },
      },
    },
  },
});

const TableCell = styled(ThemeableStack, {
  padding: "$3",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  overflow: "hidden",
});

const SortButton = styled(Stack, {
  flexDirection: "row",
  alignItems: "center",
  cursor: "pointer",
  gap: "$1",
});

export interface TableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T, any>[];
  onRowClick?: (row: T) => void;
  pageSize?: number;
}

export function Table<T extends object>({
  data: initialData,
  columns,
  onRowClick,
  pageSize = 10,
}: TableProps<T>) {
  // Local state to manage data after deletion
  const [data, setData] = useState(initialData);
  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(data.length / pageSize),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize,
      },
    },
    defaultColumn: {
      size: 200,
      maxSize: 300,
    },
  });

  return (
    <Stack gap="$4">
      <TableWrapper>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Stack>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} isHeader>
                  {headerGroup.headers.map((header) => (
                    <TableCell
                      key={header.id}
                      style={{ width: header.getSize() }}
                    >
                      {header.column.getCanSort() ? (
                        <SortButton
                          onPress={header.column.getToggleSortingHandler()}
                        >
                          <Paragraph fontWeight={700} color={"$color05"}>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </Paragraph>
                          {{
                            asc: <ChevronUp size={16} />,
                            desc: <ChevronDown size={16} />,
                            false: (
                              <>
                                <ChevronUp size={16} style={{ opacity: 0.3 }} />
                                <ChevronDown
                                  size={16}
                                  style={{ opacity: 0.3 }}
                                />
                              </>
                            ),
                          }[String(header.column.getIsSorted())] ?? null}
                        </SortButton>
                      ) : (
                        <Paragraph fontWeight={700} color={"$color05"}>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </Paragraph>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <ScrollView style={{ maxHeight: 500 }}>
              <TableBody>
                {table.getRowModel().rows.map((row, index) => (
                  <TableRow
                    key={row.id}
                    isHoverable
                    onPress={() => onRowClick?.(row.original)}
                    style={{ height: 74 }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        style={{ width: cell.column.getSize() }}
                      >
                        <Paragraph numberOfLines={2} ellipsizeMode="tail">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </Paragraph>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </ScrollView>
          </Stack>
        </ScrollView>
      </TableWrapper>

      <XStack justifyContent="space-between" alignItems="center">
        <TablePagination table={table} />
      </XStack>
    </Stack>
  );
}
