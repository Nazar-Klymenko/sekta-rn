import { create } from "zustand";

interface RouteState {
  previousRoute: string;
  setPreviousRoute: (route: string) => void;
}

export const useRouteStore = create<RouteState>((set) => ({
  previousRoute: "/",
  setPreviousRoute: (route) => set({ previousRoute: route }),
}));
