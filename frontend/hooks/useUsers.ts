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

    const { 
            data: user,
            isLoading: isSingleLoading , 
            error: isSingleError
        } = useQuery<User>({
        queryKey: ['user'],
        queryFn: async () => {
            const { data } = await AxiosInstance.get('/user/profile')
            return data
        }
    })


    return {
        isLoading,
        error,
        users,

        //single User
        user,
        isSingleLoading,
        isSingleError
    }
}