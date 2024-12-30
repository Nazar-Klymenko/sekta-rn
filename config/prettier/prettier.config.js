module.exports = {
  // Import sorting plugin and configuration
  plugins: ["@trivago/prettier-plugin-sort-imports"],
  importOrder: [
    "^react$",
    "^react-native$",
    "^firebase/",
    // Third party libraries (excluding yup)
    "^(?!yup$)\\w[\\w-]*\\w$",
    // UI Framework imports
    "^tamagui$",
    "^@tamagui/",
    // Application features
    "^@/features/",
    // Form validation related
    "^yup$",
    "^@hookform/resolvers/yup",
    // Relative imports
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,

  semi: true,
  trailingComma: "es5",
  tabWidth: 2,
  bracketSpacing: true,
  bracketSameLine: false,
  printWidth: 80,
};
