export const APP_NAME = "Sekta Selekta";

export const formatPageTitle = (pageName?: string) => {
  if (!pageName) return APP_NAME;
  return `${pageName} - ${APP_NAME}`;
};
