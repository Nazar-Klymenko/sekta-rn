import React, { useCallback } from "react";

import { RefreshControl } from "react-native";

import { usePathname, useRouter } from "expo-router";

import { PageContainer } from "@/features/core/components/layout/PageContainer";

import ResidentCard from "../components/ResidentCard";
import { SkeletonResidentCard } from "../components/SkeletonResidentCard";
import { useFetchAllResidents } from "../hooks/useFetchAllResidents";

export default function ResidentListScreen() {
  const pathname = usePathname();
  const router = useRouter();

  const {
    data: residents,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useFetchAllResidents();

  const handleLogin = useCallback(() => {
    router.push(`/events/residents/122`);
  }, [router, pathname]);

  return (
    <PageContainer
      refreshControl={
        <RefreshControl
          refreshing={isRefetching}
          onRefresh={() => {
            refetch();
          }}
        />
      }
      gap="$4"
    >
      {isLoading
        ? Array(3)
            .fill(null)
            .map((_, index) => <SkeletonResidentCard key={index} />)
        : residents?.map((resident, idx) => (
            <ResidentCard resident={resident} key={idx} />
          ))}
    </PageContainer>
  );
}
