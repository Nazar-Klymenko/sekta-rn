import { useEffect } from "react";
import React from "react";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { useUsernameAvailability } from "@/features/auth/hooks/useUsernameAvailability";
import { ButtonCTA } from "@/features/core/components/buttons/ButtonCTA";
import { Form } from "@/features/core/components/form/Form";
import { Input } from "@/features/core/components/form/Input";
import { FullPageLoading } from "@/features/core/components/layout/FullPageLoading";
import { PageContainer } from "@/features/core/components/layout/PageContainer";
import { AuthGuard } from "@/features/core/components/navigation/AuthGuard";
import { useUserData } from "@/features/users/hooks/useUserData";
import { usernameSchema } from "@/utils/validationSchemas";

import { Info } from "@tamagui/lucide-icons";
import { useToastController } from "@tamagui/toast";

import { Paragraph, XStack } from "tamagui";

import { useForm } from "react-hook-form";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { useChangeUsername } from "../hooks/useChangeUsername";

const profileUpdateSchema = yup.object().shape({
  username: usernameSchema,
});

type FormValues = yup.InferType<typeof profileUpdateSchema>;

export default function ChangeUsernameScreen() {
  const { user } = useAuth();
  const { data: userData, isLoading, isError } = useUserData(user?.uid || "");
  const changeUsernameMutation = useChangeUsername();
  const toast = useToastController();

  const methods = useForm({
    resolver: yupResolver(profileUpdateSchema),
    defaultValues: {
      username: userData?.username || "",
    },
    mode: "onTouched",
  });

  const {
    handleSubmit,
    reset,
    watch,
    setError,
    formState: { isDirty },
  } = methods;
  const username = watch("username");

  useEffect(() => {
    if (user && userData) {
      reset({
        username: userData.username || "",
      });
    }
  }, [user, userData, reset]);
  const {
    refetch: checkUsernameAvailability,
    isLoading: isUsernameCheckLoading,
  } = useUsernameAvailability(username);

  const onSubmit = async (data: FormValues) => {
    try {
      const result = await checkUsernameAvailability();
      if (result.data) {
        changeUsernameMutation.mutate(data.username, {
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
      setError("username", { message: "Error checking username availability" });
      toast.show("Error", {
        message: "Error checking username availability.",
        variant: "error",
      });
    }
  };

  if (isLoading) return <FullPageLoading />;
  if (isError) return <Paragraph>Error loading user data</Paragraph>;

  return (
    <AuthGuard>
      <PageContainer>
        <Form methods={methods}>
          <Input
            id="username"
            name="username"
            label="Username"
            placeholder="Username"
            autoCapitalize="none"
            inputMode="text"
            maxLength={20}
          />

          <XStack gap="$2" marginBottom="$4">
            <Info color="$gray10Light" size={16} alignSelf="center" />
            <Paragraph fontSize="$3" color="$gray10Light">
              Your new username must be 3-20 characters long and can contain
              letters, numbers, and underscores.
            </Paragraph>
          </XStack>

          <ButtonCTA
            theme="accent"
            onPress={handleSubmit(onSubmit)}
            isLoading={
              changeUsernameMutation.isPending || isUsernameCheckLoading
            }
            disabled={
              !isDirty ||
              changeUsernameMutation.isPending ||
              isUsernameCheckLoading
            }
          >
            Update Username
          </ButtonCTA>
        </Form>
      </PageContainer>
    </AuthGuard>
  );
}
