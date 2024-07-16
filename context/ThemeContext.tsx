import React, { createContext, useContext, useEffect, useState } from "react";

import { Appearance } from "react-native";

type ThemeColorType = "light" | "dark";

type ThemeContextType = {
  themeColor: ThemeColorType;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getInitialTheme = (): ThemeColorType => {
  const colorScheme = Appearance.getColorScheme();
  return colorScheme === "dark" ? "dark" : "light";
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [themeColor, setThemeColor] = useState<ThemeColorType>(
    getInitialTheme()
  );

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setThemeColor(colorScheme === "dark" ? "dark" : "light");
    });

    return () => subscription.remove();
  }, []);

  const toggleTheme = () => {
    setThemeColor((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ themeColor, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};
