// components/Typography.tsx
import { styled, Text, TextProps } from "tamagui";

export const Typography = styled(Text, {
  variants: {
    variant: {
      h1: { fontSize: "$8", fontWeight: "bold", lineHeight: "$8" },
      h2: { fontSize: "$7", fontWeight: "bold", lineHeight: "$7" },
      h3: { fontSize: "$6", fontWeight: "bold", lineHeight: "$6" },
      h4: { fontSize: "$5", fontWeight: "bold", lineHeight: "$5" },
      h5: { fontSize: "$4", fontWeight: "bold", lineHeight: "$4" },
      body1: { fontSize: "$4", lineHeight: "$4" },
      body2: { fontSize: "$3", lineHeight: "$3" },
      caption: { fontSize: "$2", lineHeight: "$2" },
      button: {
        fontSize: "$3",
        fontWeight: "500",
        textTransform: "uppercase",
        letterSpacing: 0.5,
      },
      navLink: {
        fontSize: "$3",
        fontWeight: "500",
        textTransform: "uppercase",
        letterSpacing: 0.5,
      },
    },
  },
} as const);

export type TypographyProps = TextProps & {
  variant?: keyof (typeof Typography)["variants"]["variant"];
};

export const TypographyComponent: React.FC<TypographyProps> = ({
  variant,
  ...props
}) => {
  return <Typography variant={variant} {...props} />;
};

export default TypographyComponent;
