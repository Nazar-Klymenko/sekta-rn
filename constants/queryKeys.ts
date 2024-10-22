// constants/queryKeys.ts
export const QUERY_KEYS = {
  EVENTS: ["events"],
  EVENT: (id: string) => ["event", id],
} as const;
