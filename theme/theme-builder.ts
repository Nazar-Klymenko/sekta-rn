import { createThemeBuilder } from "@tamagui/theme-builder";

const palettes = {
  dark: [
    "hsla(24, 92%, 52%, 1)", // 0: secondaryColor (Vibrant Orange)
    "hsla(0, 0%, 4%, 1)", // 1: backgroundColor (Nearly Black)
    "hsla(0, 0%, 11%, 1)", // 2: surfaceColor (Dark Gray)
    "hsla(0, 88%, 56%, 1)", // 3: errorColor (Bright Red)
    "hsla(0, 0%, 100%, 1)", // 4: onErrorColor (Pure White)
    "hsla(72, 65%, 93%, 1)", // 5: primaryColor / onBackgroundColor / onSecondaryColor (Very Light Yellow-Green)
    "hsla(0, 0%, 4%, 1)", // 6: onPrimaryColor (Nearly Black, same as backgroundColor)
    "hsla(75, 13%, 72%, 1)", // 7: onSurfaceColor (Light Grayish Green)
    "hsla(72, 65%, 93%, 0.75)", // 8: primaryColor with 75% opacity
    "hsla(72, 65%, 93%, 0.5)", // 9: primaryColor with 50% opacity
    "hsla(72, 65%, 93%, 0.25)", // 10: primaryColor with 25% opacity
    "hsla(72, 65%, 93%, 0)", // 11: primaryColor with 0% opacity (Transparent)
  ],
};

const templates = {
  dark_base: {
    background: 1, // Nearly Black
    surface: 2, // Dark Gray
    error: 3, // Bright Red
    onError: 4, // Pure White
    primary: 5, // Very Light Yellow-Green
    onBackground: 5, // Very Light Yellow-Green
    onSecondary: 5, // Very Light Yellow-Green
    onPrimary: 6, // Nearly Black
    onSurface: 7, // Light Grayish Green
    secondary: 0, // Vibrant Orange

    // Additional mappings based on the original template
    accentBackground: 0, // Vibrant Orange
    accentColor: 0, // Vibrant Orange
    background0: 1, // Nearly Black
    background025: 8, // Very Light Yellow-Green (75% opacity)
    background05: 9, // Very Light Yellow-Green (50% opacity)
    background075: 10, // Very Light Yellow-Green (25% opacity)
    color1: 5, // Very Light Yellow-Green
    color2: 5, // Very Light Yellow-Green
    color3: 5, // Very Light Yellow-Green
    color4: 5, // Very Light Yellow-Green
    color5: 5, // Very Light Yellow-Green
    color6: 5, // Very Light Yellow-Green
    color7: 5, // Very Light Yellow-Green
    color8: 5, // Very Light Yellow-Green
    color9: 5, // Very Light Yellow-Green
    color10: 5, // Very Light Yellow-Green
    color11: 4, // Pure White
    color12: 4, // Pure White
    color0: 11, // Transparent
    color025: 10, // Very Light Yellow-Green (25% opacity)
    color05: 9, // Very Light Yellow-Green (50% opacity)
    color075: 8, // Very Light Yellow-Green (75% opacity)
    backgroundHover: 2, // Dark Gray
    backgroundPress: 1, // Nearly Black
    backgroundFocus: 1, // Nearly Black
    borderColor: 5, // Very Light Yellow-Green
    borderColorHover: 5, // Very Light Yellow-Green
    borderColorPress: 7, // Light Grayish Green
    borderColorFocus: 5, // Very Light Yellow-Green
    color: 5, // Very Light Yellow-Green
    colorHover: 5, // Very Light Yellow-Green
    colorPress: 5, // Very Light Yellow-Green
    colorFocus: 5, // Very Light Yellow-Green
    colorTransparent: 11, // Transparent
    placeholderColor: 7, // Light Grayish Green
    outlineColor: 0, // Vibrant Orange
  },
};

export const themes = createThemeBuilder()
  .addPalettes(palettes)
  .addTemplates(templates)
  .addThemes({
    dark: {
      template: "base",
      palette: "dark",
    },
  })
  .build();
