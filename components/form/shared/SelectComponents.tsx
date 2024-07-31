// src/components/form/MultiSelect.tsx
import { Check, ChevronDown } from "@tamagui/lucide-icons";

import React, { useState } from "react";

import { Adapt, Select, Sheet, Text, XStack, YStack } from "tamagui";

import { LinearGradient } from "tamagui/linear-gradient";

export const ScrollUpButton = () => {
  return (
    <Select.ScrollUpButton
      alignItems="center"
      justifyContent="center"
      position="relative"
      width="100%"
      height="$3"
    >
      <YStack zIndex={10}>
        <ChevronDown size={20} />
      </YStack>
      <LinearGradient
        start={[0, 0]}
        end={[0, 1]}
        fullscreen
        colors={["$background", "transparent"]}
        borderRadius="$4"
      />
    </Select.ScrollUpButton>
  );
};

export const ScrollDownButton = () => {
  return (
    <Select.ScrollDownButton
      alignItems="center"
      justifyContent="center"
      position="relative"
      width="100%"
      height="$3"
    >
      <YStack zIndex={10}>
        <ChevronDown size={20} />
      </YStack>
      <LinearGradient
        start={[0, 0]}
        end={[0, 1]}
        fullscreen
        colors={["transparent", "$background"]}
        borderRadius="$4"
      />
    </Select.ScrollDownButton>
  );
};

export const SelectTrigger = ({ placeholder }: { placeholder: string }) => (
  <Select.Trigger width={220} iconAfter={ChevronDown}>
    <Select.Value placeholder={placeholder} />
  </Select.Trigger>
);
export const MultiSelectTrigger = ({
  placeholder,
  children,
}: {
  placeholder: string;
  children?: React.ReactNode;
}) => (
  <Select.Trigger iconAfter={ChevronDown}>
    <Select.Value> {children}</Select.Value>
  </Select.Trigger>
);

export const CustomAdapt = ({ native }: any) => {
  return (
    <Adapt when="sm" platform="touch">
      <Sheet
        native={native}
        modal
        dismissOnSnapToBottom
        animationConfig={{
          type: "spring",
          damping: 20,
          mass: 1.2,
          stiffness: 250,
        }}
      >
        <Sheet.Frame>
          <Sheet.ScrollView>
            <Adapt.Contents />
          </Sheet.ScrollView>
        </Sheet.Frame>
        <Sheet.Overlay
          animation="lazy"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
      </Sheet>
    </Adapt>
  );
};
