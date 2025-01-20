import React from "react";

import { useRouter } from "expo-router";
import { YStack } from "tamagui";

import { Laugh, Play, Ticket, Users } from "@tamagui/lucide-icons";

import { MenuItem } from "@/features/core/components/buttons/MenuItem";
import { PageContainer } from "@/features/core/components/layout/PageContainer";

export default function AdminScreen() {
  const router = useRouter();

  return (
    <PageContainer>
      <YStack gap="$2">
        <MenuItem
          title="All Events"
          onPress={() => router.push("/admin/events")}
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
        <MenuItem
          title="All residents"
          onPress={() => router.push("/admin/residents")}
          icon={Laugh}
        />
      </YStack>
    </PageContainer>
  );
}
