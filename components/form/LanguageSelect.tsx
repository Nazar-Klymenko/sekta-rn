import { Check, ChevronDown, ChevronUp } from "@tamagui/lucide-icons";

import { useMemo, useState } from "react";

import type { FontSizeTokens, SelectProps } from "tamagui";
import {
  Adapt,
  Label,
  Select,
  Sheet,
  XStack,
  YStack,
  getFontSize,
} from "tamagui";

import { LinearGradient } from "tamagui/linear-gradient";

export function LanguageSelect() {
  return (
    <XStack padding="$4" gap="$4" display="flex" justifyContent="space-between">
      <Label htmlFor="select-demo-1" f={1}>
        Language
      </Label>
      <SelectDemoItem id="select-demo-1" />
    </XStack>
  );
}

export function SelectDemoItem(props: SelectProps) {
  const [val, setVal] = useState("en");

  const languages = [
    { code: "pl", name: "Polish" },
    { code: "en", name: "English" },
    { code: "ru", name: "Russian" },
    { code: "ua", name: "Ukrainian" },
  ];

  return (
    <Select
      value={val}
      onValueChange={setVal}
      disablePreventBodyScroll
      {...props}
    >
      <Select.Trigger width={220} iconAfter={ChevronDown}>
        <Select.Value placeholder="Select Language" />
      </Select.Trigger>

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

      <Select.Content zIndex={200000}>
        <Select.ScrollUpButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronUp size={20} />
          </YStack>
          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            fullscreen
            colors={["$background", "transparent"]}
            borderRadius="$4"
          />
        </Select.ScrollUpButton>

        <Select.Viewport minWidth={200}>
          <Select.Group>
            <Select.Label>Languages</Select.Label>
            {useMemo(
              () =>
                languages.map((lang, i) => {
                  return (
                    <Select.Item index={i} key={lang.code} value={lang.code}>
                      <Select.ItemText>{lang.name}</Select.ItemText>
                      <Select.ItemIndicator marginLeft="auto">
                        <Check size={16} />
                      </Select.ItemIndicator>
                    </Select.Item>
                  );
                }),
              [languages]
            )}
          </Select.Group>
          {props.native && (
            <YStack
              position="absolute"
              right={0}
              top={0}
              bottom={0}
              alignItems="center"
              justifyContent="center"
              width={"$4"}
              pointerEvents="none"
            >
              <ChevronDown
                size={getFontSize((props.size as FontSizeTokens) ?? "$true")}
              />
            </YStack>
          )}
        </Select.Viewport>

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
      </Select.Content>
    </Select>
  );
}
