import React from "react";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { useSignOut } from "@/features/auth/hooks/useSignOut";
import { MenuItem } from "@/features/core/components/buttons/MenuItem";
import { PrimaryButton } from "@/features/core/components/buttons/PrimaryButton";
import { SecondaryButton } from "@/features/core/components/buttons/SecondaryButton";
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

import { ProfileHeader, SectionTitle, VerifyEmail } from "../components";

export default function ProfileScreen() {
  const { user, isLoggedIn } = useAuth();
  const { data: userData } = useUserData(user?.uid || "");
  const signOutMutation = useSignOut();
  const router = useRouter();

  const handleSignOut = () => {
    signOutMutation.mutate();
  };
  return (
    <PageContainer>
      <YStack gap="$4">
        <ProfileHeader user={user} userData={userData} />
        <VerifyEmail />
        <Separator />
        <YStack gap="$2">
          {isLoggedIn && (
            <>
              <SectionTitle>Account</SectionTitle>
              <MenuItem
                title="Change username"
                onPress={() => router.push("/profile/change-username")}
                icon={User2}
              />
              <MenuItem
                title="Change email"
                onPress={() => router.push("/profile/change-email")}
                icon={Mail}
              />

              <MenuItem
                title="Change Password"
                onPress={() => router.push("/profile/change-password")}
                icon={Lock}
              />
              <MenuItem
                title="Delete account"
                onPress={() => router.push("/profile/delete-profile")}
                icon={Trash2}
              />
              <SectionTitle>Notifications</SectionTitle>
              <MenuItem
                title="Push notifications"
                onPress={() => router.push("/profile/push-notifications")}
                icon={Bell}
              />
              <MenuItem
                title="Email notifications"
                onPress={() => router.push("/profile/email-notifications")}
                icon={Mail}
              />
            </>
          )}

          <SectionTitle>Support</SectionTitle>
          <MenuItem
            title="Terms of Service"
            onPress={() => router.push("/tos")}
            icon={FileText}
          />
          <MenuItem
            title="Privacy policy"
            onPress={() => router.push("/privacy-policy")}
            icon={ShieldCheck}
          />
          <MenuItem
            title="Contact us"
            onPress={() => router.push("/contact")}
            icon={HelpCircle}
          />
        </YStack>

        <YStack
          justifyContent="flex-end"
          alignItems="stretch"
          marginVertical={16}
        >
          {isLoggedIn ? (
            <PrimaryButton onPress={handleSignOut}>Sign Out</PrimaryButton>
          ) : (
            <YStack gap="$4">
              <PrimaryButton onPress={() => router.push("/auth/login")}>
                Log In
              </PrimaryButton>
              <SecondaryButton
                onPress={() => router.push("/auth/username-bridge")}
                text="Sign Up"
              />
            </YStack>
          )}
        </YStack>
      </YStack>
    </PageContainer>
  );
}
