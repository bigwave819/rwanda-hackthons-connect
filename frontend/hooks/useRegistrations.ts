"use client";

import { Registrations, UserRegisteredForEvent } from "@/types";
import AxiosInstance from "@/utils/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useRegistrations = (eventId?: string) => {
  const queryClient = useQueryClient();

  const { data: registrations, error, isLoading } = useQuery<Registrations[]>({
    queryKey: ['registrations'],
    queryFn: async () => {
      const { data } = await AxiosInstance.get('registrations/me')
      return data
    }
  })

  const { data: userRegistered, isLoading: usersLoading, error: usersError } = useQuery<UserRegisteredForEvent[]>({
    queryKey: ['users'],
   queryFn: async () => {
      if (!eventId) return [];
      const { data } = await AxiosInstance.get(
        `/registrations/event/${eventId}`
      );
      return data;
    },
    enabled: !!eventId,
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

    userRegistered,
    usersLoading,
    usersError,

    createRegistration: createRegistrationMutation.mutate,
    isCreatingRegistration: createRegistrationMutation.isPending,
    errorInCreatingRegistration: createRegistrationMutation.isError,
  };
};