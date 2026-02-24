'use client'

import { Event, EventStatus } from "@/types"
import AxiosInstance from "@/utils/axios"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"


export const useEvents = (id?: string) => {
    const queryClient = useQueryClient()

    const { data: events = [], isLoading, isError, error } = useQuery<Event[]>({
        queryKey: ['events'],
        queryFn: async () => {
            const { data } = await AxiosInstance.get('/events');
            console.log("DATA: ", data);    
            return data
        },
        retry: false,
        enabled: !id
    });

    const createEventMutation = useMutation({
        mutationFn: async (payload: Omit<Event, 'id' | 'status' | 'createdAt' | 'updatedAt' >) => {
            const { data } = await AxiosInstance.post("/events", payload);
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["events"] });
        },
    });

    const deleteEventMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data } = await AxiosInstance.delete(`/events/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: EventStatus;
    }) => {
      const { data } = await AxiosInstance.patch(`/events/${id}`, { status });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  /* ================= FETCH SINGLE EVENT ================= */
  const {
    data: event,
    isLoading: isSingleLoading,
    isError: isSingleError,
  } = useQuery<Event>({
    queryKey: ["event", id],
    queryFn: async () => {
      const { data } = await AxiosInstance.get(`/events/${id}`);
      console.log(data);
      
      return data;
    },
    enabled: !!id,
    retry: false,
  });


  return {
    events,
    isLoading,
    isError,
    error,

    /* single */
    event,
    isSingleLoading,
    isSingleError,

    createEvent: createEventMutation.mutate,
    isCreating: createEventMutation.isPending,

    deleteEvent: deleteEventMutation.mutate,
    isDeleting: deleteEventMutation.isPending,

    updateStatus: updateStatusMutation.mutate,
    isUpdating: updateStatusMutation.isPending,
  };
}