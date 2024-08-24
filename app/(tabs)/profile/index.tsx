import {
  Bell,
  ChevronRight,
  FileText,
  Globe,
  HelpCircle,
  Lock,
  Mail,
  Moon,
  ShieldCheck,
  Sun,
  Trash2,
  User,
  User2,
  UserCircle,
  UserSquare,
} from "@tamagui/lucide-icons";

import React from "react";

import { Pressable } from "react-native";

import { signOut } from "@/api/auth";
import { useThemeContext } from "@/context/ThemeContext";
import { useAuth } from "@/hooks/useAuth";
import { useUserData } from "@/hooks/useUserData";

import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import {
  Avatar,
  Button,
  Label,
  Separator,
  Stack,
  Text,
  Theme,
  XStack,
  YStack,
  styled,
} from "tamagui";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { Switch } from "@/components/buttons/CustomSwitch";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { SecondaryButton } from "@/components/buttons/SecondaryButton";
import { Form } from "@/components/form/Form";
import { Select } from "@/components/form/Select";
import { PageContainer } from "@/components/layout/PageContainer";

const schema = yup.object().shape({
  selectLanguage: yup.string().oneOf(["en", "pl", "ru", "ua"]).default("en"),
});
export type FormValues = yup.InferType<typeof schema>;
export default function ProfileScreen() {
  const { user, isLoggedIn } = useAuth();
  const { data: userData, isLoading, isError } = useUserData(user?.uid || "");

  const { themeColor, toggleTheme } = useThemeContext();
  const isDarkMode = themeColor === "dark";
  const router = useRouter();
  const methods = useForm<FormValues>({
      resolver: yupResolver(schema),
      defaultValues: {
        selectLanguage: "en",
      },
      mode: "onBlur",
    }),
    { control, handleSubmit, reset } = methods;

  return (
    <PageContainer formContainer>
      <Form methods={methods}>
        <YStack alignItems="center" gap="$2">
          <Avatar circular size="$12">
            {user?.photoURL ? (
              <Avatar.Image src={user.photoURL} />
            ) : (
              <Avatar.Fallback
                backgroundColor="$blue10Light"
                justifyContent="center"
                alignItems="center"
              >
                <User size="$8" color="$blue1Light" />
              </Avatar.Fallback>
            )}
          </Avatar>
          <Text fontSize="$6" fontWeight="bold">
            {userData?.username || user?.displayName || "Guest"}
          </Text>
          <Text fontSize="$3" color="$gray10Light">
            {userData?.email || user?.email || "Not logged in"}
          </Text>
        </YStack>

        <Separator />

        {isLoggedIn && (
          <>
            <YStack gap="$2">
              <SectionTitle>Account</SectionTitle>
              <MenuItem
                title="Username"
                onPress={() => router.push("/profile/change-username")}
                icon={User2}
              />
              <MenuItem
                title="Email"
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
            </YStack>
            <YStack gap="$2">
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
            </YStack>
          </>
        )}

        <YStack gap="$2">
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
            onPress={() => router.push("/profile/contact")}
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
            <PrimaryButton onPress={signOut} text="Sign Out" />
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
      </Form>
    </PageContainer>
  );
}
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <Text fontSize="$5" fontWeight="bold" marginBottom="$2">
    {children}
  </Text>
);

const ResponsiveStack = styled(XStack, {
  hoverStyle: {
    backgroundColor: "$backgroundHover",
    cursor: "pointer",
  },
  pressStyle: {
    backgroundColor: "$backgroundHover",
  },
  padding: "$4",
  borderRadius: "$2",
  justifyContent: "space-between",
});
const MenuItem = ({
  title,
  onPress,
  icon: Icon,
}: {
  title: string;
  onPress: () => void;
  icon: React.ElementType;
}) => (
  <ResponsiveStack onPress={onPress}>
    <XStack alignItems="center" gap="$3">
      <Icon size="$1" color="$gray10Light" />
      <Text fontSize="$4">{title}</Text>
    </XStack>
    <ChevronRight size="$1" color="$color" />
  </ResponsiveStack>
);
// const languages = [
//   { value: "pl", label: "Polish" },
//   { value: "en", label: "English" },
//   { value: "ru", label: "Russian" },
//   { value: "ua", label: "Ukrainian" },
// ];

{
  /* <YStack gap="$2">
          <SectionTitle>Preferences</SectionTitle>
          <XStack
            alignItems="center"
            justifyContent="space-between"
            backgroundColor="$background"
            padding="$4"
            borderRadius="$2"
          >
            <XStack alignItems="center" gap="$3">
              {isDarkMode ? (
                <Moon size="$1" color="$gray10Light" />
              ) : (
                <Sun size="$1" color="$gray10Light" />
              )}
              <Text fontSize="$4">
                {isDarkMode ? "Dark Mode" : "Light Mode"}
              </Text>
            </XStack>
            <Switch checked={isDarkMode} onPress={toggleTheme} />
          </XStack>

          <XStack
            padding="$4"
            gap="$4"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <XStack alignItems="center" f={1} gap="$3">
              <Globe size="$1" color="$gray10Light" />
              <Label htmlFor="language-select">Language</Label>
            </XStack>
            <Select
              name="selectLanguage"
              label="language"
              id="profile-language-select"
              placeholder="Select a language"
              items={languages}
              hideLabel
              hideErrors
            />
          </XStack>
        </YStack> */
}
