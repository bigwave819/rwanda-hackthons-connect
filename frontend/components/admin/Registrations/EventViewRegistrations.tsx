'use client'

import { useEvents } from "@/hooks/useEvents";
import { LayoutDashboard, User, Users } from "lucide-react";
import Link from "next/link";


function EventViewRegistrations() {
    const { events, error, isLoading } = useEvents();

    if (error instanceof Error) {
        return (
            <div>{error.message}</div>
        )
    }
    if (isLoading) {
        return (
            <div>loading ...</div>
        )
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
            {
                events.map((items) => {
                    return (
                        <Link key={items.id} href={`/admin/registrations/${items.id}`}>
                            <div className="bg-white flex flex-col p-5 rounded-xl">
                                <div className="flex space-x-5 mb-5">
                                    <User className="p-2 text-lg rounded-full bg-gray-400" />
                                    <h3 className="font-bold text-gray-700">{items.title}</h3>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex space-x-2">
                                        <Users size={22} />
                                        <p>Registered User: 100</p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <LayoutDashboard size={22} />
                                        <p>Status: <span className="px-2 py-1 bg-green-300 rounded-md">{items.status}</span></p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    );
}

export default EventViewRegistrations;