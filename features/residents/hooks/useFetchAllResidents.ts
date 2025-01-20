import { useQuery } from "@tanstack/react-query";

import { DisplayResident } from "@/features/residents/models/Resident";

import { fetchAllResidents } from "../repository/fetchAllResidents";

export const useFetchAllResidents = (
  sortDirection: "asc" | "desc" = "desc"
) => {
  return useQuery<DisplayResident[], Error>({
    queryKey: ["allResidents"],
    queryFn: () => fetchAllResidents(sortDirection),
  });
};
