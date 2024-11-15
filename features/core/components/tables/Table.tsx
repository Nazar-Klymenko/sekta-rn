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
  SizableText,
  Stack,
  Theme,
  ThemeableStack,
  XStack,
  YStack,
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
  backgroundColor: "$background",
  borderBottomWidth: 1,
  borderBottomColor: "$borderColor",
});

const TableBody = styled(ThemeableStack, {
  backgroundColor: "$background",
});
const TableFooter = styled(ThemeableStack, {
  backgroundColor: "$background",
  borderTopWidth: 1,
  borderTopColor: "$borderColor",
});

const TableRow = styled(ThemeableStack, {
  flexDirection: "row",
  borderBottomWidth: 1,
  borderBottomColor: "$borderColor",
  variants: {
    isHeader: {
      true: {
        backgroundColor: "$background",
      },
    },
    isHoverable: {
      true: {
        cursor: "pointer",
        hoverStyle: {
          backgroundColor: "$backgroundHover",
        },
        pressStyle: {
          backgroundColor: "$backgroundPress",
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
  data,
  columns,
  onRowClick,
  pageSize = 10,
}: TableProps<T>) {
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
      minSize: 60,
      maxSize: 300,
    },
  });

  return (
    <Theme name={"surface1"}>
      <Stack gap="$4">
        <TableWrapper>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Stack>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} theme="surface2" isHeader>
                    {headerGroup.headers.map((header) => (
                      <TableCell
                        key={header.id}
                        style={{ width: header.getSize() }}
                      >
                        {header.column.getCanSort() ? (
                          <SortButton
                            onPress={header.column.getToggleSortingHandler()}
                          >
                            <Paragraph
                              fontWeight={700}
                              color={
                                header.column.getIsSorted()
                                  ? "$color"
                                  : "$color05"
                              }
                            >
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
                                  <ChevronUp
                                    size={16}
                                    style={{ opacity: 0.3 }}
                                  />
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
                  {table.getRowModel().rows.map((row) => (
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
                          <Paragraph
                            numberOfLines={2}
                            ellipsizeMode="tail"
                            alignItems="center"
                            justifyContent="center"
                          >
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
              <TableFooter>
                {table.getFooterGroups().map((footerGroup) => (
                  <TableRow key={footerGroup.id}>
                    {footerGroup.headers.map((footer) => (
                      <TableCell
                        key={footer.id}
                        style={{ width: footer.getSize() }}
                      >
                        <SizableText fontWeight={700} color="$color05">
                          {flexRender(
                            footer.column.columnDef.footer,
                            footer.getContext()
                          )}
                        </SizableText>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableFooter>
            </Stack>
          </ScrollView>
        </TableWrapper>

        <XStack>
          <TablePagination table={table} />
        </XStack>
      </Stack>
    </Theme>
  );
}
