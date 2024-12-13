import React from "react";

import { Paragraph, View, XStack, YStack } from "tamagui";

export const PasswordStrengthIndicator = ({
  password,
}: {
  password: string;
}) => {
  const getStrength = () => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const strength = getStrength();
  const colors = ["red", "yellow", "lightgreen", "green", "darkgreen"];
  const currentColor = colors[Math.min(strength - 1, colors.length - 1)];

  return (
    <YStack display="inline-flex">
      <XStack display="inline-flex">
        {[...Array(5)].map((_, index) => (
          <View
            key={index}
            style={{
              flexGrow: 1,
              height: 4,
              backgroundColor: index < strength ? currentColor : "gray",
              marginRight: index < 4 ? 2 : 0,
              borderTopLeftRadius: index === 0 ? 4 : 0,
              borderBottomLeftRadius: index === 0 ? 4 : 0,
              borderTopRightRadius: index === 4 ? 4 : 0,
              borderBottomRightRadius: index === 4 ? 4 : 0,
            }}
          />
        ))}
      </XStack>
      <Paragraph fontSize={12} fontWeight="400" color="$accentColor">
        Use 8 or more characters with a mix of uppercase and lowercase letters,
        numbers & special characters.
      </Paragraph>
    </YStack>
  );
};
