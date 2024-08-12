// src/components/Table.tsx
import React from "react";

import {
  GetProps,
  Text,
  Theme,
  ThemeableStack,
  styled,
  withStaticProperties,
} from "tamagui";

const TableComponent = styled(ThemeableStack, {
  borderWidth: 1,
  borderColor: "$borderColor",
  borderRadius: "$4",
  overflow: "hidden",
  width: "100%",
  flex: 1,
});

const TableHead = styled(ThemeableStack, {
  backgroundColor: "$backgroundStrong",
});

const TableBody = styled(ThemeableStack, {
  backgroundColor: "$background",
});

const Row = styled(ThemeableStack, {
  flexDirection: "row",
  borderBottomWidth: 1,
  borderColor: "$borderColor",
  hoverStyle: {
    backgroundColor: "$backgroundHover",
  },
  variants: {
    isHeader: {
      true: {
        backgroundColor: "$backgroundHover",
        hoverStyle: {
          backgroundColor: "$backgroundHover",
        },
      },
    },
  },
});

const Cell = styled(ThemeableStack, {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  paddingVertical: "$3",
  paddingHorizontal: "$3",
  flex: 1,
  minWidth: 220,
});

const HeaderCell = styled(Cell, {});

export type TableProps = GetProps<typeof TableComponent>;
export type TableHeaderProps = GetProps<typeof TableHead>;
export type TableBodyProps = GetProps<typeof TableBody>;
export type RowProps = GetProps<typeof Row>;
export type CellProps = GetProps<typeof Cell> & { children: React.ReactNode };

export const Table = withStaticProperties(TableComponent, {
  Head: TableHead,
  Body: TableBody,
  Row,
  Cell,
  HeaderCell,
});
