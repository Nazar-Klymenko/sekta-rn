import { useQuery } from "@tanstack/react-query";

import { DisplayResident } from "../models/Resident";
import { fetchResident } from "../repository/fetchResident";

export const useFetchResident = (id: string) => {
  return useQuery<DisplayResident, Error>({
    queryKey: ["resident", id],
    queryFn: () => fetchResident(id),
  });
};
