// src/hooks/useDrawer.ts
import { useContext } from "react";

import { DrawerContext } from "@/context/DrawerContext";

export const useDrawer = () => {
  const context = useContext(DrawerContext);
  if (context === undefined) {
    throw new Error("useDrawer must be used within a DrawerProvider");
  }
  return context;
};
