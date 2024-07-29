import React from "react";

import { FormProvider, UseFormReturn } from "react-hook-form";
import { StackProps, YStack } from "tamagui";

interface Props extends StackProps {
  methods: UseFormReturn<any>;
  children: React.ReactNode;
}

export const Form = ({ children, methods, ...stackProps }: Props) => {
  return (
    <FormProvider {...methods}>
      <YStack gap="$4" {...stackProps}>
        {children}
      </YStack>
    </FormProvider>
  );
};
