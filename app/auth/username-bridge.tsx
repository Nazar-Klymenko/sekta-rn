import React, { useEffect } from "react";

import { queryUserByUsername } from "@/api/firestore";
import { useUsernameAvailability } from "@/hooks/useUsernameAvailability";

import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { Text, XStack, YStack } from "tamagui";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { HelloWave } from "@/components/HelloWave";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { Form } from "@/components/form/Form";
import { Input } from "@/components/form/Input";
import { PageContainer } from "@/components/layout/PageContainer";
import { AuthPageGuard } from "@/components/navigation/AuthPageGuard";

const usernameBridgeSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(18, "Username must be at most 18 characters")
    .lowercase()
    .trim(),
});

type FormValues = yup.InferType<typeof usernameBridgeSchema>;

export default function UsernameBridgeScreen() {
  const router = useRouter();
  const { returnTo } = useLocalSearchParams<{ returnTo?: string }>();

  const methods = useForm<FormValues>({
      resolver: yupResolver(usernameBridgeSchema),
      shouldFocusError: true,
      defaultValues: {
        username: "",
      },
    }),
    { handleSubmit, setValue, setError, watch } = methods;

  const username = watch("username");
  const {
    refetch: checkAvailability,
    data: isAvailable,
    isLoading,
    isError,
    error,
  } = useUsernameAvailability(username);

  const onSubmit = async (data: FormValues) => {
    try {
      const result = await checkAvailability();
      if (result.data) {
        router.push({
          pathname: "/auth/signup",
          params: {
            username: data.username,
            returnTo: returnTo,
          },
        });
      } else {
        setError("username", { message: "Username is taken" });
      }
    } catch (err) {
      console.error("Error checking username availability:", err);
      setError("username", { message: "Error checking username availability" });
    }
  };

  return (
    <AuthPageGuard>
      <PageContainer>
        <Form methods={methods}>
          <XStack justifyContent="center">
            <Text fontSize={24} fontWeight="bold" textAlign="center">
              Welcome!{"  "}
            </Text>
            <HelloWave />
          </XStack>
          <Input
            id="username"
            name="username"
            label="Username"
            placeholder="Username"
            autoCapitalize="none"
            inputMode="text"
          />
          <PrimaryButton
            text="Next"
            onPress={handleSubmit(onSubmit)}
            isLoading={isLoading}
            disabled={isLoading}
          />
          <YStack alignItems="center" padding="$4" gap="$4">
            <Link href={`/auth/login?returnTo=${returnTo}`}>
              <Text textAlign="center">
                Already have an account?
                <Text color="$accentColor"> Log in</Text>
              </Text>
            </Link>
          </YStack>
        </Form>
      </PageContainer>
    </AuthPageGuard>
  );
}
