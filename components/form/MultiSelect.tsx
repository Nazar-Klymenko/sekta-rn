// src/components/form/MultiSelect.tsx
import { Check, ChevronDown } from "@tamagui/lucide-icons";

import React, { useState } from "react";

import { Adapt, Select, Sheet, Text, XStack, YStack } from "tamagui";

import { Tag } from "@/components/Tag";

interface MultiSelectProps {
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  value,
  onChange,
  placeholder,
}) => {
  const [open, setOpen] = useState(false);

  const handleValueChange = (newValue: string) => {
    const updatedValue = value.includes(newValue)
      ? value.filter((v) => v !== newValue)
      : [...value, newValue];
    onChange(updatedValue);
  };

  return (
    <Select
      open={open}
      onOpenChange={setOpen}
      value={value.length > 0 ? value[0] : undefined}
      onValueChange={handleValueChange}
    >
      <Select.Trigger width="100%">
        <Select.Value placeholder={placeholder}>
          <XStack flexWrap="wrap" gap="$2">
            {value.map((item) => (
              <Tag key={item} tag={item} />
            ))}
          </XStack>
        </Select.Value>
      </Select.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet modal dismissOnSnapToBottom>
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay />
        </Sheet>
      </Adapt>

      <Select.Content>
        <Select.ScrollUpButton
          ai="center"
          jc="center"
          pos="relative"
          w="100%"
          h="$3"
        >
          <YStack zi={10}>
            <ChevronDown size={20} />
          </YStack>
        </Select.ScrollUpButton>

        <Select.Viewport minWidth={200}>
          <YStack gap="$0">
            {options.map((item, i) => (
              <Select.Item index={i} key={item} value={item}>
                <Select.ItemText>{item}</Select.ItemText>
                <Select.ItemIndicator marginLeft="auto">
                  {value.includes(item) && <Check size={16} />}
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </YStack>
        </Select.Viewport>

        <Select.ScrollDownButton
          ai="center"
          jc="center"
          pos="relative"
          w="100%"
          h="$3"
        >
          <YStack zi={10}>
            <ChevronDown size={20} />
          </YStack>
        </Select.ScrollDownButton>
      </Select.Content>
    </Select>
  );
};
