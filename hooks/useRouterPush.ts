// hooks/useRouterPush.ts
import { useRouter, useLocalSearchParams } from "expo-router";

type Params = Record<string, string>;

export const useRouterPush = (authRoute: string) => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const routerPush = (additionalParams?: Params) => {
    router.push({
      pathname: authRoute,
      params: { ...params, ...additionalParams },
    });
  };

  return routerPush;
};
