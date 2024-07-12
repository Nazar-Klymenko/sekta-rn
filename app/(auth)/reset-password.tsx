// On your web app's reset password page
import { confirmPasswordReset } from "firebase/auth";

import { useState } from "react";

import { auth } from "@/services/firebase";

import { Link } from "expo-router";
import { FormProvider, Input, Text, YStack } from "tamagui";

import { PageContainer } from "@/components/PageContainer";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { AuthPageGuard } from "@/components/navigation/AuthPageGuard";

const ResetPasswordPage: React.FC = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      // Get the action code from the URL
      const actionCode = new URLSearchParams(window.location.search).get(
        "oobCode"
      );
      if (!actionCode) {
        setError("Invalid password reset link");
        return;
      }

      await confirmPasswordReset(auth, actionCode, newPassword);
      setSuccess(true);
    } catch (err) {
      setError((err as Error).message);
    }
  };
  return <Text>Password reset page</Text>;
  //   <AuthPageGuard>
  //     <PageContainer>
  //       <FormProvider {...methods}>
  //         <Text
  //           fontSize={24}
  //           fontWeight="bold"
  //           textAlign="center"
  //           marginBottom="$4"
  //         >
  //           Forgot Password
  //         </Text>

  //         <Input
  //           id="forgot-password-email"
  //           name="email"
  //           label="Email"
  //           placeholder="Enter your email"
  //           inputMode="email"
  //           autoCapitalize="none"
  //         />
  //         <PrimaryButton
  //           text="Reset Password"
  //           onPress={onSubmit}
  //           isLoading={sendPasswordResetMutation.isLoading}
  //           disabled={sendPasswordResetMutation.isLoading}
  //         />
  //         <YStack alignItems="center" padding="$4" gap="$4">
  //           <Link href="/(auth)/login">
  //             <Text color="blue" textAlign="center">
  //               Back to login
  //             </Text>
  //           </Link>
  //         </YStack>
  //       </FormProvider>
  //     </PageContainer>
  //   </AuthPageGuard>;
};
