"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { Avatar } from "../ui/avatar";
import { User } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useRouter } from "next/navigation";
import Link from "next/link";

function UserAvatar() {
    const { user, logout } = useAuthStore();

    const router = useRouter()

    return (
        <div>
            {user ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="p-0 w-12 h-12 rounded-full bg-white border border-gray-200 shadow-md transition flex items-center justify-center">
                            <User className="text-black w-6 h-6" />
                        </Avatar>
                    </DropdownMenuTrigger>


                    <DropdownMenuContent className="w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                        <DropdownMenuGroup>
                            <DropdownMenuLabel className="text-gray-700 font-semibold text-sm">
                                {user.fullName}
                            </DropdownMenuLabel>

                            <DropdownMenuItem
                                className="text-gray-800 hover:bg-gray-100 rounded-md px-3 py-2 cursor-pointer"
                            >
                                <Link href={`/profile`}>
                                    Profile
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                className="text-gray-800 hover:bg-gray-100 rounded-md px-3 py-2 cursor-pointer"
                            >
                                <Link href={`/registered`}>
                                    Registered
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>

                        <DropdownMenuSeparator className="my-1" />

                        <DropdownMenuItem
                            onClick={() => logout()}
                            className="text-red-600 hover:bg-red-50 rounded-md px-3 py-2 cursor-pointer font-medium"
                        >
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <div>
                    <button 
                        className="px-4 py-2 rounded-full bg-white text-black border border-gray-200 hover:shadow-md transition"
                        onClick={() => router.push("/login")}
                    >
                        Login
                    </button>
                </div>
            )}
        </div>
    );
}

export default UserAvatar;
