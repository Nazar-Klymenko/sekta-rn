import { ChevronLeft, ChevronRight } from "@tamagui/lucide-icons";
import React, { useMemo, useState } from "react";

import { Button, Text, XStack, YStack, ScrollView } from "tamagui";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (value: React.SetStateAction<number>) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
}: PaginationProps) => {
  return (
    <XStack
      justifyContent="space-between"
      alignItems="center"
      marginVertical="$4"
    >
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
  );
};
