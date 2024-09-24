import React, { useState } from "react";

import { Dialog } from "@/features/core/components/Dialog";
import { SecondaryButton } from "@/features/core/components/buttons/SecondaryButton";
import { Form } from "@/features/core/components/form/Form";
import { PasswordInput } from "@/features/core/components/form/PasswordInput";
import { PageContainer } from "@/features/core/components/layout/PageContainer";
import { AuthGuard } from "@/features/core/components/navigation/AuthGuard";

import { useToastController } from "@tamagui/toast";

import { Text, useTheme } from "tamagui";

import { useForm } from "react-hook-form";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { useDeleteProfile } from "../hooks/useDeleteProfile";

const deleteProfileSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required to delete your account"),
});

type FormValues = yup.InferType<typeof deleteProfileSchema>;

export default function DeleteProfileScreen() {
  const theme = useTheme();
  const toast = useToastController();

  const deleteProfileMutation = useDeleteProfile();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const methods = useForm({
      resolver: yupResolver(deleteProfileSchema),
      defaultValues: {
        password: "",
      },
      mode: "onTouched",
    }),
    { setError } = methods;

  const onSubmit = async (data: FormValues) => {
    deleteProfileMutation.mutate(data.password, {
      onSuccess: () => {
        toast.show("Account deleted", {
          message: "Your account has been successfully deleted.",
          variant: "success",
        });
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
          isLoading={deleteProfileMutation.isPending}
          disabled={deleteProfileMutation.isPending}
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
              isLoading={deleteProfileMutation.isPending}
              disabled={deleteProfileMutation.isPending}
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
              theme="dark"
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
