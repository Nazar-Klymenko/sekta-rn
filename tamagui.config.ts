import { animations, config, media, tokens } from "@tamagui/config/v3";

import { createFont, createTamagui } from "tamagui";

import * as themes from "./lib/theme/theme-output";

const leagueSpartanFace = {
  100: { normal: "LeagueSpartan_100Thin" },
  200: { normal: "LeagueSpartan_200ExtraLight" },
  300: { normal: "LeagueSpartan_300Light" },
  400: { normal: "LeagueSpartan_400Regular" },
  500: { normal: "LeagueSpartan_500Medium" },
  600: { normal: "LeagueSpartan_600SemiBold" },
  700: { normal: "LeagueSpartan_700Bold" },
  800: { normal: "LeagueSpartan_800ExtraBold" },
  900: { normal: "LeagueSpartan_900Black" },
};

const headingFont = createFont({
  size: config.fonts.heading.size,
  lineHeight: config.fonts.heading.lineHeight,
  weight: config.fonts.heading.weight,
  letterSpacing: config.fonts.heading.letterSpacing,
  face: leagueSpartanFace,
});

const bodyFont = createFont({
  size: config.fonts.body.size,
  lineHeight: config.fonts.body.lineHeight,
  weight: config.fonts.body.weight,
  letterSpacing: config.fonts.body.letterSpacing,
  face: leagueSpartanFace,
});

const extendedTheme = {
  ...themes,
  danger: {
    background: tokens.color.red10Light.val, // Default red background
    backgroundHover: tokens.color.red11Light.val, // Hover state red
    backgroundPress: tokens.color.red11Light.val, // Press state red
    color: themes.dark.color,
    borderColor: tokens.color.red10Light.val, // Border color matching background
  },
};

export const tamaguiConfig = createTamagui({
  tokens,
  animations,
  media: media,
  themes: extendedTheme,
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },
});

export default tamaguiConfig;

export type Conf = typeof tamaguiConfig;
declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}
