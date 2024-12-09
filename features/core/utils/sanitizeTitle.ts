export const sanitizeTitle = (title: string): string => {
  return title
    .toLowerCase() // convert to lowercase
    .trim() // remove leading/trailing spaces
    .replace(/\s+/g, " ") // replace multiple spaces with single space
    .replace(/[^a-z0-9\s]/g, "") // remove special characters
    .replace(/\s/g, "-"); // replace spaces with dashes
};
