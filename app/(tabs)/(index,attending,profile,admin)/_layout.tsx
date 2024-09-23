import { Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
  profile: { initialRouteName: "profile/index" },
  admin: { initialRouteName: "admin" },
};

type Segment = "(profile)" | "(attending)" | "(index)" | "(admin)";

// Define the mapping of segments to routes
const segmentToRoute: Record<Segment, string> = {
  "(profile)": "profile",
  "(attending)": "attending",
  "(index)": "events",
  "(admin)": "admin",
};

// Define the props for the DynamicLayout component
interface DynamicLayoutProps {
  segment: Segment;
}

export default function DynamicLayout({ segment }: DynamicLayoutProps) {
  const initialRoute = segmentToRoute[segment] || "events";

  return (
    <Stack
      screenOptions={{ headerShown: false, animation: "fade_from_bottom" }}
      initialRouteName={initialRoute}
    ></Stack>
  );
}
