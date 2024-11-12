import { useQuery, useQueryClient } from "@tanstack/react-query";

import React, { ReactNode, createContext, useEffect } from "react";

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

const USER_QUERY_KEY = ["user"];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();

  const { data: user = null, isLoading } = useQuery({
    queryKey: USER_QUERY_KEY,
    queryFn: () => auth.currentUser,
    staleTime: Infinity,
    retry: false,
  });

  useEffect(() => {
    try {
      const unsubscribe = onIdTokenChanged(auth, (user) => {
        queryClient.setQueryData(USER_QUERY_KEY, user);
      });
      return () => {
        unsubscribe();
      };
    } catch (error) {
      console.error("Failed to subscribe to auth changes:", error);
    }
  }, [queryClient]);

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
