import React from "react";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { ButtonCTA } from "@/features/core/components/buttons/ButtonCTA";
import { MenuItem } from "@/features/core/components/buttons/MenuItem";
import { PageContainer } from "@/features/core/components/layout/PageContainer";
import { useUserData } from "@/features/users/hooks/useUserData";

import {
  Bell,
  FileText,
  HelpCircle,
  Lock,
  Mail,
  ShieldCheck,
  Trash2,
  User2,
} from "@tamagui/lucide-icons";

import { Separator, YStack } from "tamagui";

import { useRouter } from "expo-router";

import { ProfileHeader } from "./ProfileHeader";
import { SectionTitle } from "./SectionTitle";
import SignOutButton from "./SignOutButton";
import { VerifyEmail } from "./VerifyEmail";

export default function ProfileScreen() {
  const { user, isLoggedIn } = useAuth();
  const { data: userData } = useUserData(user?.uid || "");
  const router = useRouter();

  return (
    <PageContainer>
      <ProfileHeader userData={userData} />
      <VerifyEmail />
      <YStack gap="$2">
        {isLoggedIn && (
          <>
            <Separator />

            <SectionTitle>Account</SectionTitle>
            <MenuItem
              title="Change username"
              onPress={() => router.navigate("/profile/change-username")}
              icon={User2}
            />
            <MenuItem
              title="Change email"
              onPress={() => router.navigate("/profile/change-email")}
              icon={Mail}
            />
            <MenuItem
              title="Change Password"
              onPress={() => router.navigate("/profile/change-password")}
              icon={Lock}
            />
            <MenuItem
              title="Delete account"
              onPress={() => router.navigate("/profile/delete-profile")}
              icon={Trash2}
            />

            <Separator />

            <SectionTitle>Notifications</SectionTitle>
            <MenuItem
              title="Push notifications"
              onPress={() => router.navigate("/profile/push-notifications")}
              icon={Bell}
            />
            <MenuItem
              title="Email notifications"
              onPress={() => router.navigate("/profile/email-notifications")}
              icon={Mail}
            />
          </>
        )}
        <Separator />

        <SectionTitle>Support</SectionTitle>
        <MenuItem
          title="Terms of Service"
          onPress={() => router.navigate("/tos")}
          icon={FileText}
        />
        <MenuItem
          title="Privacy policy"
          onPress={() => router.navigate("/privacy-policy")}
          icon={ShieldCheck}
        />
        <MenuItem
          title="Contact us"
          onPress={() => router.navigate("/contact")}
          icon={HelpCircle}
        />
      </YStack>

      <YStack justifyContent="flex-end" alignItems="stretch" marginTop="$4">
        {isLoggedIn ? (
          <SignOutButton />
        ) : (
          <YStack flex={1} width="100%" gap="$4">
            <ButtonCTA
              theme={"accent"}
              onPress={() => router.navigate("/auth/login")}
            >
              Log In
            </ButtonCTA>
            <ButtonCTA onPress={() => router.navigate("/auth/username-bridge")}>
              Sign Up
            </ButtonCTA>
          </YStack>
        )}
      </YStack>
    </PageContainer>
  );
}
