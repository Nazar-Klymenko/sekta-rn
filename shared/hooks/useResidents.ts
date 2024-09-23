// /hooks/useResidents.ts
import { useQuery } from "@tanstack/react-query";

import { fetchResidentById, fetchResidents } from "@/shared/api/residents";
import { ResidentData } from "@/shared/models/ResidentData";

export const useResidents = () => {
  return useQuery<ResidentData[], Error>({
    queryKey: ["residents"],
    queryFn: fetchResidents,
  });
};

export const useResident = (id: string) => {
  return useQuery<ResidentData | null, Error>({
    queryKey: ["resident", id],
    queryFn: () => fetchResidentById(id),
    enabled: !!id,
  });
};
