import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAuth } from "@/features/core/hooks/useAuth";
import { UserData } from "@/models/UserData";

import { changeEmail } from "../api/changeEmail";

export const useChangeEmail = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      profileData,
      currentPassword,
    }: {
      profileData: Partial<UserData>;
      currentPassword?: string;
    }) => changeEmail(user!, profileData, currentPassword),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userData"] });
      if (user) {
        user.reload(); // Refresh the user object to get updated info
      }
    },
  });
};
