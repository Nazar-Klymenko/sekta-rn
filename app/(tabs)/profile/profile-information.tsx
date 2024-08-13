import { useToastController } from "@tamagui/toast";

import React, { useEffect } from "react";

import { useAuth } from "@/hooks/useAuth";
import { useUpdateProfile } from "@/hooks/useAuthOperations";
import { useUserData } from "@/hooks/useUserData";
import { useUsernameAvailability } from "@/hooks/useUsernameAvailability";

import { FormProvider, useForm } from "react-hook-form";
import { Spinner, Text, XStack, YStack, useTheme } from "tamagui";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { MenuButton } from "@/components/buttons/MenuButton";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { SecondaryButton } from "@/components/buttons/SecondaryButton";
import { Form } from "@/components/form/Form";
import { Input } from "@/components/form/Input";
import { FullPageLoading } from "@/components/layout/FullPageLoading";
import { PageContainer } from "@/components/layout/PageContainer";
import { AuthGuard } from "@/components/navigation/AuthGuard";

const profileUpdateSchema = yup.object().shape({
  email: yup.string().required("Email is required").email("Invalid email"),
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(18, "Username must be at most 18 characters")
    .lowercase()
    .trim(),
  fullName: yup.string(),
});

type FormValues = yup.InferType<typeof profileUpdateSchema>;

export default function UpdateProfileScreen() {
  const { user } = useAuth();
  const { data: userData, isLoading, isError } = useUserData(user?.uid || "");
  const updateProfileMutation = useUpdateProfile();
  const toast = useToastController();

  const methods = useForm({
      resolver: yupResolver(profileUpdateSchema),
      defaultValues: {
        email: userData?.email || "",
        username: userData?.username || "",
        fullName: userData?.fullName || "",
      },
    }),
    {
      handleSubmit,
      reset,
      watch,
      setError,
      formState: { isDirty },
    } = methods;

  useEffect(() => {
    if (userData) {
      reset({
        email: userData.email || "",
        username: userData.username || "",
        fullName: userData.fullName || "",
      });
    }
  }, [userData, reset]);

  const username = watch("username");
  const {
    refetch: checkUsernameAvailability,
    data: isUsernameAvailable,
    isLoading: isUsernameCheckLoading,
    isError: isUsernameCheckError,
    error: usernameCheckError,
  } = useUsernameAvailability(username);

  const onSubmit = async (data: FormValues) => {
    try {
      const result = await checkUsernameAvailability();
      if (result.data) {
        updateProfileMutation.mutate(data, {
          onSuccess: () => {
            toast.show("Profile updated successfully", {
              message: "Your profile information has been updated.",
              variant: "success",
            });
          },
          onError: (error) => {
            toast.show("Profile update failed", {
              message:
                error instanceof Error ? error.message : "An error occurred",
              variant: "error",
            });
          },
        });
      } else {
        setError("username", { message: "Username is taken" });
        toast.show("Username is taken", {
          message: "Please choose a different username.",
          variant: "error",
        });
      }
    } catch (err) {
      console.error("Error checking username availability:", err);
      setError("username", { message: "Error checking username availability" });
      toast.show("Error", {
        message: "Error checking username availability.",
        variant: "error",
      });
    }
  };

  if (isLoading) return <FullPageLoading />;

  if (isError) {
    return <Text>Error loading user data</Text>;
  }

  return (
    <AuthGuard>
      <PageContainer formContainer>
        <Form methods={methods}>
          <Text fontSize={24} fontWeight="bold" textAlign="center">
            Update Profile Information
          </Text>
          <Input
            id="update-email"
            name="email"
            label="Email"
            placeholder="Email"
          />
          <Input
            id="update-username"
            name="username"
            label="Username"
            placeholder="Username"
          />
          <Input
            id="full-name"
            name="fullName"
            label="Full Name"
            placeholder="Full name"
          />
          <XStack
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <YStack>
              <Text>Verify email</Text>
              <Text fontSize="$4" color="$gray10Light">
                {user?.email}
              </Text>
            </YStack>
            <MenuButton
              disabled={user?.emailVerified}
              text={user?.emailVerified ? "Verified" : "Verify"}
            />
          </XStack>
          <PrimaryButton
            onPress={handleSubmit(onSubmit)}
            text="Update Profile"
            isLoading={updateProfileMutation.isPending}
            disabled={updateProfileMutation.isPending || !isDirty}
          />
        </Form>
      </PageContainer>
    </AuthGuard>
  );
}
