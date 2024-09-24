import React from "react";

import { MenuItem } from "@/features/core/components/buttons/MenuItem";
import { PageContainer } from "@/features/core/components/layout/PageContainer";

import { BoomBox, Play, Ticket, Users } from "@tamagui/lucide-icons";

import { SizableText, YStack } from "tamagui";

import { useRouter } from "expo-router";

export default function AdminScreen() {
  const router = useRouter();

  return (
    <PageContainer formContainer>
      <SizableText fontSize={24} fontWeight="bold">
        Admin page
      </SizableText>
      <YStack gap="$2">
        <MenuItem
          title="All Events"
          onPress={() => router.push("/admin/events")}
          icon={Ticket}
        />
        <MenuItem
          title="All Residents"
          onPress={() => router.push("/admin/residents")}
          icon={BoomBox}
        />
        <MenuItem
          title="All play submissions"
          onPress={() => router.push("/admin/submissions")}
          icon={Play}
        />
        <MenuItem
          title="All users"
          onPress={() => router.push("/admin/userlist")}
          icon={Users}
        />
      </YStack>
    </PageContainer>
  );
}
