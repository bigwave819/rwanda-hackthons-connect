'use client'

import UsersView from "@/components/admin/Users/UsersView";
import { Search } from "lucide-react";

function UsersPage() {
    return (
        <div className="w-full min-h-screen p-5 flex flex-col gap-6">
            <div className="w-full flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold">View All Registered Users</h1>
                    <p className="text-muted-foreground mt-1">On this page you will find all registered users.</p>
                </div>
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                    <input
                        type="search"
                        placeholder="Search users..."
                        className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>
            </div>
            <UsersView />
        </div>
    );
}

export default UsersPage;
