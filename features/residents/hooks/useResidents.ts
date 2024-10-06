import { useQuery } from "@tanstack/react-query";

import { Resident } from "../models/Resident";
import { fetchResidentById, fetchResidents } from "../repository/residents";

export const useResidents = () => {
  return useQuery<Resident[], Error>({
    queryKey: ["residents"],
    queryFn: fetchResidents,
  });
};

export const useResident = (id: string) => {
  return useQuery<Resident | null, Error>({
    queryKey: ["resident", id],
    queryFn: () => fetchResidentById(id),
    enabled: !!id,
  });
};
