import React, { useCallback } from "react";

import { usePathname, useRouter } from "expo-router";
import { Separator, SizableText, YStack } from "tamagui";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { ButtonCTA } from "@/features/core/components/buttons/ButtonCTA";
import { PageContainer } from "@/features/core/components/layout/PageContainer";
import { ReanimatedPageContainer } from "@/features/core/components/layout/ReanimatedPageContainer";
import { useAnimatedScroll } from "@/features/core/hooks/useAnimatedScroll";

export default function ResidentScreen() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogin = useCallback(() => {
    router.push(`/events/residents/122`);
  }, [router, pathname]);

  return (
    <PageContainer>
      <SizableText onPress={() => handleLogin}>Resident screen</SizableText>
      <SizableText>Resident screen</SizableText>
      <SizableText>Resident screen</SizableText>
      <SizableText>Resident screen</SizableText>
      <SizableText>Resident screen</SizableText>
      <SizableText>Resident screen</SizableText>
      <SizableText>Resident screen</SizableText>
      <SizableText>Resident screen</SizableText>
      <SizableText>Resident screen</SizableText>
      <SizableText>Resident screen</SizableText>
      <SizableText>Resident screen</SizableText>
      <SizableText>Resident screen</SizableText>
      <SizableText>Resident screen</SizableText>
      <SizableText>Resident screen</SizableText>
      <SizableText>Resident screen</SizableText>
      <SizableText>Resident screen</SizableText>
      <SizableText>Resident screen</SizableText>
      <SizableText>Resident screen</SizableText>
      <SizableText>Resident screen</SizableText>
      <SizableText>Resident screen</SizableText>
      <SizableText>Resident screen</SizableText>
      <SizableText>Resident screen</SizableText>
      <SizableText>Resident screen</SizableText>
      <SizableText>Resident screen</SizableText>
      <SizableText>Resident screen</SizableText>
      <SizableText>Resident screen</SizableText>
      <SizableText>Resident screen</SizableText>
    </PageContainer>
  );
}
