import { Table } from "@tanstack/react-table";

import React from "react";

import { ChevronLeft, ChevronRight } from "@tamagui/lucide-icons";

import { Button, Paragraph, XStack } from "tamagui";

interface TablePaginationProps<T extends object> {
  table: Table<T>;
}

export function TablePagination<T extends object>({
  table,
}: TablePaginationProps<T>) {
  return (
    <XStack justifyContent="space-between" alignItems="center" flex={1}>
      <Paragraph>
        Page {table.getState().pagination.pageIndex + 1} of{" "}
        {table.getPageCount()}
      </Paragraph>

      <XStack gap="$2" alignItems="center">
        <Button
          icon={ChevronLeft}
          disabled={!table.getCanPreviousPage()}
          onPress={() => table.previousPage()}
          variant="outlined"
          borderWidth={1}
        >
          Previous
        </Button>

        <Button
          iconAfter={ChevronRight}
          disabled={!table.getCanNextPage()}
          onPress={() => table.nextPage()}
          variant="outlined"
          borderWidth={1}
        >
          Next
        </Button>
      </XStack>
    </XStack>
  );
}
