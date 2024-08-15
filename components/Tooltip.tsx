import React from "react";
import {
  Tooltip as TamaguiTooltip,
  TooltipProps,
  styled,
  Stack,
  Text,
} from "tamagui";

interface CustomTooltipProps extends Omit<TooltipProps, "children"> {
  content: string | React.ReactNode;
  children: React.ReactNode;
}

const TooltipContent = styled(Stack, {
  backgroundColor: "$backgroundStrong",
  borderRadius: "$4",
});

export const Tooltip: React.FC<CustomTooltipProps> = ({
  content,
  children,
  ...props
}) => {
  return (
    <TamaguiTooltip {...props}>
      <TamaguiTooltip.Trigger>{children}</TamaguiTooltip.Trigger>

      <TamaguiTooltip.Content
        enterStyle={{ x: 0, y: -5, opacity: 0, scale: 0.9 }}
        exitStyle={{ x: 0, y: -5, opacity: 0, scale: 0.9 }}
        scale={1}
        x={0}
        y={0}
        opacity={1}
        animation={[
          "quickest",
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}
      >
        <TamaguiTooltip.Arrow />
        <TooltipContent>
          {typeof content === "string" ? (
            <Text fontSize="$2" lineHeight="$1">
              {content}
            </Text>
          ) : (
            content
          )}
        </TooltipContent>
      </TamaguiTooltip.Content>
    </TamaguiTooltip>
  );
};
