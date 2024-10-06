import { useQuery } from "@tanstack/react-query";

import { PlaySubmission } from "@/features/play/models/PlaySubmission";

import { fetchPlaySubmissions } from "../api/fetchPlaySubmissions";

export const useFetchPlaySubmissions = () => {
  return useQuery<PlaySubmission[], Error>({
    queryKey: ["playSubmissions"],
    queryFn: fetchPlaySubmissions,
  });
};
