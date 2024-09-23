import React from "react";

import { useSignOut } from "@/features/auth/hooks/useSignOut";
import { useAuth } from "@/hooks/useAuth";
import { useUserData } from "@/hooks/useUserData";

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

import { MenuItem } from "@/components/buttons/MenuItem";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { SecondaryButton } from "@/components/buttons/SecondaryButton";
import { PageContainer } from "@/components/layout/PageContainer";

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
    <PageContainer formContainer>
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
          f={1}
          justifyContent="flex-end"
          alignItems="stretch"
          marginTop="$4"
        >
          {isLoggedIn ? (
            <PrimaryButton onPress={handleSignOut} text="Sign Out" />
          ) : (
            <YStack gap="$4">
              <PrimaryButton
                onPress={() => router.push("/auth/login")}
                text="Log In"
              />
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
