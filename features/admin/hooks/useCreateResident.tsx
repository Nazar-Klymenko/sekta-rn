import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "expo-router";

import { ResidentFormValues } from "@/features/admin/utils/schemas";
import { useOperationStatusHelper } from "@/features/core/hooks/useOperationStatusHelper";

import { createResident } from "../repository/createResident";

export const useCreateResident = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const handleToastMessage = useOperationStatusHelper();
  return useMutation({
    mutationFn: async ({ data }: { data: ResidentFormValues }) => {
      return await createResident(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["residents"] });
      queryClient.invalidateQueries({ queryKey: ["allResidents"] });
      handleToastMessage(null, "createEvent", "success");
      router.navigate(`/admin/residents`);
    },
    onError: (error: Error) => {
      handleToastMessage(error, "createEvent", "error");
    },
  });
};
