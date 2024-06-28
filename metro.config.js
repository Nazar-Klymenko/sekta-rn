const { getDefaultConfig } = require("@expo/metro-config");
const { withTamagui } = require("@tamagui/metro-plugin");

// Get the default Metro configuration
const defaultConfig = getDefaultConfig(__dirname, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
});

// Extend the default resolver to support additional file extensions
defaultConfig.resolver.sourceExts.push("cjs");

// Merge with Tamagui configuration
const tamaguiConfig = withTamagui(defaultConfig, {
  components: ["tamagui"],
  config: "./tamagui.config.ts",
  outputCSS: "./tamagui-web.css",
});

module.exports = tamaguiConfig;
