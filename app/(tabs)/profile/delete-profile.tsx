// src/screens/DeleteAccountScreen.tsx
import { useToastController } from "@tamagui/toast";

import React, { useState } from "react";

import { useDeleteAccount } from "@/hooks/useAuthOperations";

import { useRouter } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Paragraph, Text, XStack, YStack, useTheme } from "tamagui";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { Form } from "@/components/form/Form";
import { PasswordInput } from "@/components/form/PasswordInput";
import { PageContainer } from "@/components/layout/PageContainer";
import { AuthGuard } from "@/components/navigation/AuthGuard";
import { AuthPageGuard } from "@/components/navigation/AuthPageGuard";
import { Dialog } from "@/components/Dialog";
import { SecondaryButton } from "@/components/buttons/SecondaryButton";

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
      mode: "onTouched",
    }),
    { setError } = methods;

  const onSubmit = async (data: FormValues) => {
    deleteAccountMutation.mutate(data.password, {
      onSuccess: () => {
        toast.show("Account deleted", {
          message: "Your account has been successfully deleted.",
          variant: "success",
        });
        router.replace("/(tabs)/(home)/");
      },
      onError: (error) => {
        setError("password", { message: "Wrong password" });
      },
    });
  };

  return (
    <AuthGuard>
      <PageContainer formContainer>
        <Text fontSize={40} fontWeight="bold" textAlign="center">
          Delete Account
        </Text>
        <Text color="$gray10Light">
          Warning: This action is irreversible. All data will be permanently
          deleted.
        </Text>

        <SecondaryButton
          text="Delete Account"
          isLoading={deleteAccountMutation.isPending}
          disabled={deleteAccountMutation.isPending}
          onPress={() => {
            setShowConfirmDialog(true);
          }}
        />

        <Dialog
          modal
          open={showConfirmDialog}
          onOpenChange={setShowConfirmDialog}
          title="Delete Account"
          description="All your data will be permanently deleted. This action cannot be undone."
          id="delete-profile-dialog"
        >
          <Form methods={methods}>
            <PasswordInput
              id="delete-account-password"
              name="password"
              label="Confirm Password"
              placeholder="Enter your password"
              secureTextEntry
            />
            <SecondaryButton
              aria-label="Delete Account"
              isLoading={deleteAccountMutation.isPending}
              disabled={deleteAccountMutation.isPending}
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
              onPress={methods.handleSubmit(onSubmit)}
            />
            <SecondaryButton
              theme="alt1"
              aria-label="Close"
              text="Cancel"
              onPress={() => {
                setShowConfirmDialog(false);
              }}
            />
          </Form>
        </Dialog>
      </PageContainer>
    </AuthGuard>
  );
}
