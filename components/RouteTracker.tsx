import React, { useEffect } from "react";
import { usePathname } from "expo-router";
import { useRouteStore } from "../store/routeStore";

export const RouteTracker: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname();
  const setPreviousRoute = useRouteStore((state) => state.setPreviousRoute);

  useEffect(() => {
    setPreviousRoute(pathname);
  }, [pathname]);

  return <>{children}</>;
};
