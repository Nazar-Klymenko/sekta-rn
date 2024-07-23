// src/screens/DeleteAccountScreen.tsx
import { useToastController } from "@tamagui/toast";

import React, { useState } from "react";

import { useDeleteAccount } from "@/hooks/useAuthOperations";

import { useRouter } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";
import {
  Button,
  Dialog,
  Paragraph,
  Text,
  XStack,
  YStack,
  useTheme,
} from "tamagui";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { PasswordInput } from "@/components/form/PasswordInput";
import { PageContainer } from "@/components/layout/PageContainer";
import { AuthGuard } from "@/components/navigation/AuthGuard";
import { AuthPageGuard } from "@/components/navigation/AuthPageGuard";

const deleteAccountSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required to delete your account"),
});

type FormValues = yup.InferType<typeof deleteAccountSchema>;

export default function DeleteAccountScreen() {
  const theme = useTheme();
  const toast = useToastController();

  const router = useRouter();
  const deleteAccountMutation = useDeleteAccount();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const methods = useForm({
    resolver: yupResolver(deleteAccountSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setShowConfirmDialog(true);
  };

  const handleDeleteAccount = () => {
    const password = methods.getValues("password");
    deleteAccountMutation.mutate(password, {
      onSuccess: () => {
        toast.show("Account deleted", {
          message: "Your account has been successfully deleted.",
          variant: "success",
        });
        router.replace("/(tabs)/(home)/");
      },
      onError: (error) => {
        toast.show("Delete account failed", {
          message: error instanceof Error ? error.message : "An error occurred",
          variant: "error",
        });
        setShowConfirmDialog(false);
      },
    });
  };

  return (
    <AuthGuard>
      <PageContainer>
        <FormProvider {...methods}>
          <Text fontSize={24} fontWeight="bold" textAlign="center">
            Delete Account
          </Text>
          <Text fontSize="$4" color="$gray10Light">
            Warning: This action is irreversible. All your data will be
            permanently deleted.
          </Text>
          <PasswordInput
            id="delete-account-password"
            name="password"
            label="Confirm Password"
            placeholder="Enter your password"
            secureTextEntry
          />
          <PrimaryButton
            onPress={methods.handleSubmit(onSubmit)}
            text="Delete Account"
            isLoading={deleteAccountMutation.isLoading}
            disabled={deleteAccountMutation.isLoading}
          />
        </FormProvider>

        <Dialog
          modal
          open={showConfirmDialog}
          onOpenChange={setShowConfirmDialog}
        >
          <Dialog.Portal padding="$4">
            <Dialog.Overlay
              key="overlay"
              animation="quick"
              opacity={0.5}
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
            <Dialog.Content
              key="content"
              borderWidth={1}
              animation={[
                "quick",
                {
                  opacity: {
                    overshootClamping: true,
                  },
                },
              ]}
              enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
              exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
              x={0}
              scale={1}
              opacity={1}
              y={0}
              gap="$4"
            >
              <Dialog.Title>Are you sure?</Dialog.Title>
              <Dialog.Description>
                All your data will be permanently deleted. This action cannot be
                undone.
              </Dialog.Description>
              <YStack gap="$4" justifyContent="flex-end">
                <PrimaryButton
                  theme="active"
                  onPress={handleDeleteAccount}
                  aria-label="Delete Account"
                  isLoading={deleteAccountMutation.isLoading}
                  disabled={deleteAccountMutation.isLoading}
                  text="Delete Account"
                  backgroundColor={theme.red10Light.get()}
                  hoverStyle={{
                    backgroundColor: theme.red10Light.get(),
                    opacity: 0.9,
                  }}
                  pressStyle={{
                    backgroundColor: theme.red10Light.get(),
                    opacity: 0.9,
                  }}
                />
                <Dialog.Close asChild>
                  <Button theme="alt1" aria-label="Close">
                    Cancel
                  </Button>
                </Dialog.Close>
              </YStack>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog>
      </PageContainer>
    </AuthGuard>
  );
}
