import React from "react";
import { createContext, useContext, useState } from "react";

interface UsernameContextType {
  tempUsername: string;
  setTempUsername: (username: string) => void;
}

const UsernameContext = createContext<UsernameContextType | undefined>(
  undefined
);

export function UsernameProvider({ children }: { children: React.ReactNode }) {
  const [tempUsername, setTempUsername] = useState("");

  return (
    <UsernameContext.Provider value={{ tempUsername, setTempUsername }}>
      {children}
    </UsernameContext.Provider>
  );
}

export function useUsername() {
  const context = useContext(UsernameContext);
  if (context === undefined) {
    throw new Error("useUsername must be used within a UsernameProvider");
  }
  return context;
}
