// contexts/AuthContext.tsx
import { User } from "firebase/auth";

import React, { ReactNode, createContext, useEffect } from "react";

import { auth } from "@/services/firebase";

import { UseQueryResult, useQuery, useQueryClient } from "react-query";

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  isInitialized: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const queryClient = useQueryClient();

  const { data: user, isLoading }: UseQueryResult<User | null, unknown> =
    useQuery<User | null, unknown, User | null>(
      "user",
      () =>
        new Promise<User | null>((resolve) => {
          const unsubscribe = auth.onAuthStateChanged((user) => {
            unsubscribe();
            resolve(user);
          });
        }),
      {
        staleTime: Infinity, // Prevent automatic refetches
      }
    );

  const setUser = (newUser: User | null) => {
    queryClient.setQueryData("user", newUser);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      queryClient.setQueryData("user", user);
    });
    return unsubscribe;
  }, [queryClient]);

  const isInitialized = !isLoading;

  return (
    <AuthContext.Provider
      value={{ user: user ?? null, setUser, isInitialized }}
    >
      {children}
    </AuthContext.Provider>
  );
};
