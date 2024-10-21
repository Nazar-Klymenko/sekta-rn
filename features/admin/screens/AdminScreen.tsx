import React from "react";

import { MenuItem } from "@/features/core/components/buttons/MenuItem";
import { PageContainer } from "@/features/core/components/layout/PageContainer";

import { Play, Ticket, Users } from "@tamagui/lucide-icons";

import { YStack } from "tamagui";

import { useRouter } from "expo-router";

export default function AdminScreen() {
  const router = useRouter();

  return (
    <PageContainer>
      <YStack gap="$2">
        <MenuItem
          title="All Events"
          onPress={() => router.navigate("/admin/events")}
          icon={Ticket}
        />
        <MenuItem
          title="All play submissions"
          onPress={() => router.push("/admin/submissions")}
          icon={Play}
        />
        <MenuItem
          title="All users"
          onPress={() => router.push("/admin/users")}
          icon={Users}
        />
      </YStack>
    </PageContainer>
  );
}
