import { CheckCircle2, ChevronRight, User } from "@tamagui/lucide-icons";

import React, { useMemo } from "react";

import { Text, XStack, YStack } from "tamagui";

const passwordChecks = [
  { rule: "8 or more characters", regex: /.{8,}/, status: false },
  { rule: "Uppercase", regex: /[A-Z]/, status: false },
  { rule: "Lowercase", regex: /[a-z]/, status: false },
  { rule: "Numbers", regex: /[0-9]/, status: false },
  {
    rule: "Special characters(!@#$%^&*())",
    regex: /[^A-Za-z0-9]/,
    status: false,
  },
];

export const PasswordRequirements = ({ password }: { password: string }) => {
  const getStrength = () => {
    passwordChecks.forEach((check) => {
      check.status = check.regex.test(password);
    });
  };
  //TODO: useMemo here
  getStrength();

  return (
    <YStack marginBottom="$4" rowGap="$2">
      {passwordChecks.map((text, index) => (
        <XStack gap="$2" alignItems="center" key={index}>
          <CheckCircle2
            color={passwordChecks[index].status ? "$green9" : "$gray10"}
            size="$1"
          />
          <Text
            fontSize={12}
            fontWeight="400"
            color={passwordChecks[index].status ? "$green9" : "$gray10"}
          >
            {text.rule}
          </Text>
        </XStack>
      ))}
    </YStack>
  );
};
