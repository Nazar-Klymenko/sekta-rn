// utils/objectUtils.ts
import { isEqual } from "lodash";

/**
 * Returns an object containing all differing values between two objects
 * @param original The original object
 * @param updated The object to compare against
 * @returns An object containing only the changed values
 */
export function getChangedFields<T extends Record<string, any>>(
  original: T,
  updated: Partial<T>
): Partial<T> {
  const changes: Partial<T> = {};

  Object.keys(updated).forEach((key) => {
    const typedKey = key as keyof T;
    if (!isEqual(original[typedKey], updated[typedKey])) {
      changes[typedKey] = updated[typedKey];
    }
  });

  return changes;
}
