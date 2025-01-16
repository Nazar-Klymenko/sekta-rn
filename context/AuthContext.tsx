import { auth, db } from "@/lib/firebase/firebase";

import React, {
  ReactNode,
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { User, onIdTokenChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";

import { DisplayUser } from "@/features/users/models/User";

export type AuthContextType = {
  user: User | null;
  displayUser: DisplayUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
};

const defaultAuthContext: AuthContextType = {
  user: null,
  displayUser: null,
  isLoading: true,
  isAuthenticated: false,
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [displayUser, setdisplayUser] = useState<DisplayUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onIdTokenChanged(auth, (user) => {
      setUser(user);
      if (!user) {
        setdisplayUser(null);
        setIsLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    let unsubscribeFirestore: () => void;

    if (user) {
      unsubscribeFirestore = onSnapshot(
        doc(db, "users", user.uid),
        (doc) => {
          setdisplayUser(doc.exists() ? (doc.data() as DisplayUser) : null);
          setIsLoading(false);
        },
        (error) => {
          console.error("Error fetching user document:", error);
          setIsLoading(false);
        }
      );
    }

    return () => {
      if (unsubscribeFirestore) {
        unsubscribeFirestore();
      }
    };
  }, [user]);

  const contextValue = useMemo<AuthContextType>(
    () => ({
      user,
      displayUser,
      isLoading,
      isAuthenticated: !!user,
    }),
    [user, displayUser, isLoading]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
