import { config } from "@tamagui/config/v3";
import { createInterFont } from "@tamagui/font-inter";

import { createTamagui } from "tamagui";

import * as themes from "./theme/theme-output";

const interFont = createInterFont();

export const tamaguiConfig = createTamagui({
  ...config,
  themes,
  fonts: {
    ...config.fonts,
    heading: interFont,
    body: interFont,
  },
});

export default tamaguiConfig;

export type Conf = typeof tamaguiConfig;
declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}
