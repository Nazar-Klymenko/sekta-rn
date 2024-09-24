// src/components/navigation/Pagination.tsx
import React from "react";

import { Button, SizableText, XStack } from "tamagui";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <XStack justifyContent="center" alignItems="center" gap="$2">
      <Button
        onPress={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <SizableText>Previous</SizableText>
      </Button>
      <Button>
        <SizableText>{currentPage.toString()}</SizableText>
      </Button>
      <Button
        onPress={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <SizableText>Next</SizableText>
      </Button>
    </XStack>
  );
};
