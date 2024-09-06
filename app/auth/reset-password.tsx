// src/pages/HandlePasswordReset.tsx
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";

import React, { useEffect, useState } from "react";

import { auth } from "@/services/firebase";

import { Link, useLocalSearchParams } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";
import { Text, YStack } from "tamagui";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { Form } from "@/components/form/Form";
import { PasswordInput } from "@/components/form/PasswordInput";
import { PageContainer } from "@/components/layout/PageContainer";

const newPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

type FormValues = yup.InferType<typeof newPasswordSchema>;

export default function HandlePasswordResetScreen() {
  const { oobCode } = useLocalSearchParams();
  const [isValidCode, setIsValidCode] = useState(false);
  const [error, setError] = useState("");

  const methods = useForm({
    resolver: yupResolver(newPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    const verifyCode = async () => {
      if (typeof oobCode === "string") {
        try {
          await verifyPasswordResetCode(auth, oobCode);
          setIsValidCode(true);
        } catch (error) {
          setError("Invalid or expired reset link. Please try again.");
        }
      } else {
        setError("Invalid reset link. Please try again.");
      }
    };

    verifyCode();
  }, [oobCode]);

  const onSubmit = async (data: FormValues) => {
    if (typeof oobCode === "string") {
      try {
        await confirmPasswordReset(auth, oobCode, data.password);
        alert("password reset successfully");
      } catch (error) {
        setError("Failed to reset password. Please try again.");
      }
    }
  };

  if (!isValidCode) {
    return (
      <PageContainer>
        <Text fontSize={24} fontWeight="bold" textAlign="center">
          Reset Password
        </Text>
        <Text color="$errorColor">{error}</Text>
        <Link href="/auth/forgot-password">
          <Text color="$accentColor">Request a new reset link</Text>
        </Link>
      </PageContainer>
    );
  }

  return (
    <PageContainer formContainer>
      <Form methods={methods}>
        <Text fontSize={24} fontWeight="bold" textAlign="center">
          Set New Password
        </Text>
        <PasswordInput
          id="new-password"
          name="password"
          label="New Password"
          placeholder="Enter your new password"
        />
        <PasswordInput
          id="confirm-password"
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your new password"
        />
        <PrimaryButton
          onPress={methods.handleSubmit(onSubmit)}
          text="Reset Password"
        />
        {error && <Text color="$errorColor">{error}</Text>}
        <YStack alignItems="center" padding="$4" gap="$4">
          <Link href="/auth/login">
            <Text textAlign="center">
              Remember your password?
              <Text color="$accentColor"> Log In</Text>
            </Text>
          </Link>
        </YStack>
      </Form>
    </PageContainer>
  );
}
