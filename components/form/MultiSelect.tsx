// src/components/form/MultiSelect.tsx
import { Check, ChevronDown } from "@tamagui/lucide-icons";

import React, { useState } from "react";

import { useController, useFormContext } from "react-hook-form";
import {
  Adapt,
  Select,
  Sheet,
  SelectProps as TamaguiSelectProps,
  Text,
  XStack,
  YStack,
} from "tamagui";

import { Tag } from "@/components/Tag";

import {
  CustomAdapt,
  MultiSelectTrigger,
  ScrollDownButton,
  ScrollUpButton,
  SelectTrigger,
} from "./shared/SelectComponents";

interface MultiSelectProps extends TamaguiSelectProps {
  name: string;
  label: string;
  id: string;
  placeholder: string;
  items: string[];
}

export const MultiSelect = ({
  items,
  placeholder,
  name,
  id,
  ...props
}: MultiSelectProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const { control } = useFormContext();
  const {
    field: { value },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <Select id={id}>
      <MultiSelectTrigger placeholder={placeholder}>
        {value.map((item: any) => (
          <Tag key={item.value} tag={item.label} />
        ))}
      </MultiSelectTrigger>
      <CustomAdapt native={!!props.native} />
      <Select.Content zIndex={200000}>
        <ScrollUpButton />
        <Select.Viewport minWidth={200}>
          <Select.Group>
            <Select.Label>{placeholder}</Select.Label>
            {items.map((item, i) => {
              return (
                <Select.Item index={i} key={`${item}-${i}`} value={item}>
                  <Select.ItemText>
                    <Tag tag={item}></Tag>
                  </Select.ItemText>
                  <Select.ItemIndicator marginLeft="auto">
                    <Check size={16} />
                  </Select.ItemIndicator>
                </Select.Item>
              );
            })}
          </Select.Group>
        </Select.Viewport>

        <ScrollDownButton />
      </Select.Content>
    </Select>
  );
};
// {
//   value.map((item) => <Tag key={item} tag={item} />);
// }
// const handleValueChange = (newValue: string) => {
//   const updatedValue = value.includes(newValue)
//     ? value.filter((v) => v !== newValue)
//     : [...value, newValue];
//   onChange(updatedValue);
// };

// {items.map((item, i) => (
//   <Select.Item
//     index={i}
//     key={(item.value as string) + i}
//     value={item.value as string}
//   >
//     <Select.ItemText>{item.label}</Select.ItemText>
//     {/* <Select.ItemIndicator marginLeft="auto">
//       {value.includes(item.value as string) && <Check size={16} />}
//     </Select.ItemIndicator> */}
//   </Select.Item>
// ))}
