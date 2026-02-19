'use client'

import { useEvents } from "@/hooks/useEvents";
import { Loader2Icon } from "lucide-react";
import Image from 'next/image'


function EventView() {
    const { events, isLoading, error } = useEvents();

    if (isLoading) {
        return (
            <div className="w-full flex justify-center items-center h-36">
                <Loader2Icon className="animate-spin text-xl text-gray-600" />
            </div>
        )
    }

    if (error instanceof Error) {
        return (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200">
                <h1 className="text-red-700 font-semibold">
                    {error.message}
                </h1>
            </div>
        );
    }

    return (

        <div className="grid grig-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {
                events.map((items) => {
                    return (
                        <div key={items.id} className="border-b bg-white">
                            <div className="relative w-full h-48 mt-2">
                                <Image
                                    src={items.thumbnail}
                                    alt={items.title}
                                    fill
                                    className="object-contain"
                                />
                            </div>

                            <div className="p-4 space-y-2">
                                <h2 className="font-bold text-lg">{items.title}</h2>

                                <p className="text-sm text-gray-600 line-clamp-2">
                                    {items.description}
                                </p>

                                <div className="text-sm text-gray-500">
                                    📅 {new Date(items.date).toLocaleDateString()}
                                </div>

                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-xs font-medium px-2 py-1 rounded bg-blue-100 text-blue-700">
                                        {items.status}
                                    </span>

                                    <span className="font-semibold text-green-600">
                                        {items.prize} Frw
                                    </span>
                                </div>
                            </div>

                        </div>
                    )
                })
            }
        </div>
    );
}

export default EventView;