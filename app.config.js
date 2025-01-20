export default ({ config }) => {
  // Get the environment from EAS_BUILD_PROFILE or default to 'development'
  const buildEnvironment = process.env.EAS_BUILD_PROFILE ?? "development";

  // Define bundle identifiers for different environments
  const bundleIdentifier = {
    development: "com.sektaselekta.dev",
    preview: "com.sektaselekta.beta",
    production: "com.sektaselekta.app",
  }[buildEnvironment];

  return {
    expo: {
      name: "Sekta Selekta",
      slug: "sekta-selekta",
      version: "1.0.0",
      orientation: "portrait",
      icon: "./assets/images/app-icons/icon_120_dark.png",
      scheme: "sektaselekta",
      userInterfaceStyle: "automatic",
      jsEngine: "hermes",
      splash: {
        image: "./assets/images/splash.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff",
      },
      extra: {
        isProd: process.env.APP_ENV === "production",
        router: {
          origin: false,
        },
        eas: {
          projectId: "76284c86-cf58-4f49-92e0-eabbdfc7fe6e",
        },
      },
      ios: {
        bundleIdentifier,
      },
      android: {
        package: bundleIdentifier,
        adaptiveIcon: {
          foregroundImage: "./assets/images/adaptive-icon.png",
          backgroundColor: "#ffffff",
        },
      },
      web: {
        bundler: "metro",
        output: "static",
        favicon: "./assets/images/favicon.png",
      },
      plugins: [
        "expo-router",
        "expo-font",
        [
          "expo-notifications",
          {
            icon: "./assets/images/icon.png",
            color: "#ffffff",
          },
        ],
        [
          "@react-native-community/datetimepicker",
          {
            android: {
              datePickerDialog: {
                colorAccent: {
                  light: "#F56E14",
                  dark: "#F56E14",
                },
                textColorPrimary: {
                  light: "#000000",
                  dark: "#FFFFFF",
                },
                textColorSecondary: {
                  light: "#666666",
                  dark: "#CCCCCC",
                },
              },
              timePickerDialog: {
                background: {
                  light: "#FFFFFF",
                  dark: "#1c1c1e",
                },
                headerBackground: {
                  light: "#F56E14",
                  dark: "#F56E14",
                },
                numbersBackgroundColor: {
                  light: "#FFFFFF",
                  dark: "#1c1c1e",
                },
                numbersTextColor: {
                  light: "#000000",
                  dark: "#FFFFFF",
                },
              },
            },
          },
        ],
      ],
      experiments: {
        typedRoutes: true,
      },
      owner: "sekta-selekta",
    },
  };
};
