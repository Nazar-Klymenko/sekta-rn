import { APP_NAME } from "./seoConstants";

export const formatPageTitle = (pageName?: string) => {
  if (!pageName) return APP_NAME;
  return `${pageName} - ${APP_NAME}`;
};
