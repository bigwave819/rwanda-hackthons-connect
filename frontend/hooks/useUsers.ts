'use client'

import { User } from "@/types";
import AxiosInstance from "@/utils/axios";
import { useQuery, useQueryClient } from "@tanstack/react-query"

export const useUsers = () => {
    const queryClient = useQueryClient();

    const { data: users = [], isLoading, error } = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await AxiosInstance.get("user");
            return data
        }
    });


    return {
        isLoading,
        error,
        users
    }
}