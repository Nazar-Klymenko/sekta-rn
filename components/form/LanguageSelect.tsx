import { Check, ChevronDown, ChevronUp, Globe } from "@tamagui/lucide-icons";

import React, { useState } from "react";

import {
  Adapt,
  Label,
  Select,
  Sheet,
  XStack,
  YStack,
  getFontSize,
  styled,
} from "tamagui";
import type { FontSizeTokens, SelectProps } from "tamagui";

interface Language {
  code: string;
  name: string;
}

const LANGUAGES: Language[] = [
  { code: "pl", name: "Polish" },
  { code: "en", name: "English" },
  { code: "ru", name: "Russian" },
  { code: "ua", name: "Ukrainian" },
];

const StyledItem = styled(Select.Item, {
  backgroundColor: "$background",
  hoverStyle: {
    backgroundColor: "$backgroundHover",
    cursor: "pointer",
  },
  pressStyle: { backgroundColor: "$backgroundHover" },
});

const SelectTrigger: React.FC<{ width?: number }> = ({ width = 220 }) => (
  <Select.Trigger width={width} iconAfter={ChevronDown}>
    <Select.Value placeholder="Select Language" />
  </Select.Trigger>
);

const SelectContent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <Select.Content zIndex={200000}>{children}</Select.Content>;

const SelectViewport: React.FC<{
  children: React.ReactNode;
  native?: boolean;
  size?: FontSizeTokens;
}> = ({ children, native, size }) => (
  <Select.Viewport minWidth={200}>
    {children}
    {native && (
      <YStack
        position="absolute"
        right={0}
        top={0}
        bottom={0}
        alignItems="center"
        justifyContent="center"
        width="$4"
        pointerEvents="none"
      >
        <ChevronDown size={getFontSize(size ?? "$true")} />
      </YStack>
    )}
  </Select.Viewport>
);

const SelectItems: React.FC<{ languages: Language[] }> = ({ languages }) => (
  <Select.Group>
    <Select.Label>Languages</Select.Label>
    {languages.map((lang, i) => (
      <StyledItem index={i} key={lang.code} value={lang.code}>
        <Select.ItemText>{lang.name}</Select.ItemText>
        <Select.ItemIndicator marginLeft="auto">
          <Check size={16} />
        </Select.ItemIndicator>
      </StyledItem>
    ))}
  </Select.Group>
);

const LanguageSelectComponent: React.FC<SelectProps> = (props) => {
  const [val, setVal] = useState("en");

  return (
    <Select
      value={val}
      onValueChange={setVal}
      disablePreventBodyScroll
      {...props}
    >
      <SelectTrigger />

      <Adapt when="sm" platform="touch">
        <Sheet
          native={!!props.native}
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

      <SelectContent>
        <SelectViewport
          native={!!props.native}
          size={props.size as FontSizeTokens}
        >
          <SelectItems languages={LANGUAGES} />
        </SelectViewport>
      </SelectContent>
    </Select>
  );
};

export const LanguageSelect: React.FC = () => (
  <XStack padding="$4" gap="$4" display="flex" justifyContent="space-between">
    <XStack alignItems="center" f={1} gap="$3">
      <Globe size="$1" color="$gray10Light" />
      <Label htmlFor="language-select">Language</Label>
    </XStack>
    <LanguageSelectComponent id="language-select" />
  </XStack>
);
