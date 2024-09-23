// contexts/AuthContext.tsx
import {
  UseQueryResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import React, { ReactNode, createContext, useEffect } from "react";

import { User } from "firebase/auth";

import { auth } from "@/shared/services/firebase";

export type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  isInitialized: boolean;
  isLoggedIn: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

const userQueryKey = ["user"];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const queryClient = useQueryClient();

  const { data: user, isLoading }: UseQueryResult<User | null, unknown> =
    useQuery({
      queryKey: userQueryKey,
      queryFn: () =>
        new Promise<User | null>((resolve) => {
          const unsubscribe = auth.onAuthStateChanged((user) => {
            unsubscribe();
            resolve(user);
          });
        }),
      staleTime: Infinity, // Prevent automatic refetches
    });

  const setUser = (newUser: User | null) => {
    queryClient.setQueryData(userQueryKey, newUser);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      queryClient.setQueryData(userQueryKey, user);
    });
    return unsubscribe;
  }, [queryClient]);

  const contextValue = React.useMemo<AuthContextType>(
    () => ({
      user: user ?? null,
      setUser,
      isInitialized: !isLoading,
      isLoggedIn: !!user,
    }),
    [user, isLoading],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
