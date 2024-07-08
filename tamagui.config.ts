import { config } from "@tamagui/config/v3";
import { createInterFont } from "@tamagui/font-inter";

import { createTamagui } from "tamagui";

const interFont = createInterFont();

export const tamaguiConfig = createTamagui(config);
export default tamaguiConfig;

export type Conf = typeof tamaguiConfig;
declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}
