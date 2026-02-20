"use client";

import AxiosInstance from "@/utils/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useRegistrations = () => {
  const queryClient = useQueryClient();

  const { data: registrations, error, isLoading } = useQuery({
    queryKey: ['registrations'],
    queryFn: async () => {}
  })

  const createRegistrationMutation = useMutation({
    mutationFn: async (eventId: string) => {
      const { data } = await AxiosInstance.post("/registrations", { eventId });
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["registrations"] })
  });

  return {
    createRegistration: createRegistrationMutation.mutate,
    isCreatingRegistration: createRegistrationMutation.isPending,
    errorInCreatingRegistration: createRegistrationMutation.isError,
  };
};