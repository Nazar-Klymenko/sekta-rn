import React, { useCallback } from "react";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { ButtonCTA } from "@/features/core/components/buttons/ButtonCTA";
import { ReanimatedPageContainer } from "@/features/core/components/layout/ReanimatedPageContainer";
import { useAnimatedScroll } from "@/features/core/hooks/useAnimatedScroll";

import { Separator, YStack } from "tamagui";

import { usePathname, useRouter } from "expo-router";

import { Apply } from "./Apply";
import { PlayForm } from "./Form";
import Header from "./Header";
import { HeroSection } from "./Hero";
import { VenueInfoSection } from "./Venue";

export default function PlayScreen() {
  const { scrollHandler, scrollEventThrottle, scrollY } = useAnimatedScroll();
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogin = useCallback(() => {
    router.push(`/auth/login`);
  }, [router, pathname]);

  return (
    <>
      <Header scrollY={scrollY} />
      <ReanimatedPageContainer
        fullWidth={false}
        onScroll={scrollHandler}
        scrollEventThrottle={scrollEventThrottle}
      >
        <HeroSection />
        <YStack>
          <VenueInfoSection />
          <Separator />
          <Apply />
          {isAuthenticated ? (
            <PlayForm key="play-form" />
          ) : (
            <YStack padding="$4">
              <ButtonCTA theme="accent" onPress={handleLogin}>
                Log in to apply
              </ButtonCTA>
            </YStack>
          )}
        </YStack>
      </ReanimatedPageContainer>
    </>
  );
}
