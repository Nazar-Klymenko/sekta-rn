import React from "react";

import { SizableText } from "tamagui";

interface FormErrorProps {
  error?: {
    message?: string;
  };
}

export function FormError({ error }: FormErrorProps) {
  return (
    <SizableText
      flex={1}
      color={error ? "$red10Light" : "$colorTransparent"}
      fontSize="$2"
    >
      {error ? error.message : ""}
    </SizableText>
  );
}
