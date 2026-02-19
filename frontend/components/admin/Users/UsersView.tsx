'use client'

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useUsers } from "@/hooks/useUsers";
import { Loader2Icon } from "lucide-react";
import { format } from "date-fns";

function UsersView() {
    const { users, isLoading, error } = useUsers();

    if (isLoading) {
        return (
            <div className="w-full flex justify-center items-center h-36">
                <Loader2Icon className="animate-spin text-xl text-gray-600" />
            </div>
        )
    }

    if (error instanceof Error) {
        return (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 my-4">
                <h1 className="text-red-700 font-semibold">
                    {error.message}
                </h1>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto w-full mt-6">
            <Table className="min-w-150">
                <TableCaption>A list of your users.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date Joined</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id} className="hover:bg-gray-50">
                            <TableCell>{user.fullName}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                <span
                                    className={`px-2 py-1 rounded-full text-white text-xs font-bold ${
                                        user.role === 'USER' ? 'bg-red-500' :
                                        user.role === ' ADMIN' ? 'bg-blue-500' : 'bg-green-300'
                                    }`}
                                >
                                    {user.role}
                                </span>
                            </TableCell>
                            <TableCell>{format(new Date(user.createdAt), "PPP p")}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default UsersView;
