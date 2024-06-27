// hooks/useRouterPush.ts
import { useRouter } from "expo-router";
import { useAuth } from "@/hooks/useAuth";

type Params = {
  [key: string]: string;
};

export const useRouterPush = (authRoute: string, unauthParams: Params) => {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  const routerPush = () => {
    if (isLoggedIn) {
      router.push(authRoute);
    } else {
      router.push({
        pathname: "/(auth)/login",
        params: unauthParams,
      });
    }
  };

  return routerPush;
};
