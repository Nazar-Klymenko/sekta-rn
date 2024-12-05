import React, { ReactNode, createContext, useEffect, useState } from "react";

import { User, onIdTokenChanged } from "firebase/auth";

import { auth } from "@/lib/firebase/firebase";

export type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
};

const ANONYMOUS_USER: AuthContextType = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
} as const;

export const AuthContext = createContext<AuthContextType>(ANONYMOUS_USER);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const unsubscribe = onIdTokenChanged(auth, (user) => {
        setUser(user);
        setIsLoading(false);
      });

      return () => {
        unsubscribe();
      };
    } catch (error) {
      console.error("Failed to subscribe to auth changes:", error);
      setIsLoading(false);
    }
  }, []);

  const contextValue = React.useMemo<AuthContextType>(
    () => ({
      user,
      isLoading,
      isAuthenticated: !!user,
    }),
    [user, isLoading]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
