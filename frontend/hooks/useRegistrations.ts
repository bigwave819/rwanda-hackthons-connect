"use client";

import { Registrations } from "@/types";
import AxiosInstance from "@/utils/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useRegistrations = () => {
  const queryClient = useQueryClient();

  const { data: registrations, error, isLoading } = useQuery<Registrations[]>({
    queryKey: ['registrations'],
    queryFn: async () => {
      const { data } = await AxiosInstance.get('registrations/me')
      return data
    }
  })

  const createRegistrationMutation = useMutation({
    mutationFn: async (eventId: string) => {
      const { data } = await AxiosInstance.post("/registrations", { eventId });
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["registrations"] })
  });

  return {
    registrations,
    error,
    isLoading,
    createRegistration: createRegistrationMutation.mutate,
    isCreatingRegistration: createRegistrationMutation.isPending,
    errorInCreatingRegistration: createRegistrationMutation.isError,
  };
};