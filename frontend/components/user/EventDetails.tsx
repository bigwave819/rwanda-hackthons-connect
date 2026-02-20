"use client";

import { useEvents } from "@/hooks/useEvents";
import { useRegistrations } from "@/hooks/useRegistrations";
import Image from "next/image";
import { Spinner } from "../ui/spinner";

function EventDetails({ id }: { id: string }) {
  const { event, isSingleLoading, isSingleError } = useEvents(id);

  const { createRegistration, isCreatingRegistration  } = useRegistrations()

  console.log(event);

  const handleRegister = () => {
    createRegistration(id);
  };


  const statusColors = {
    OPEN: "bg-blue-100 text-blue-600",
    CLOSED: "bg-red-100 text-red-600",
    FINISHED: "bg-green-100 text-green-600",
  };

  /* ================= SKELETON LOADING ================= */
  if (isSingleLoading) {
    return (
      <div className="max-w-4xl mx-auto bg-white shadow rounded-xl overflow-hidden animate-pulse">
        {/* image skeleton */}
        <div className="h-72 w-full bg-gray-200" />

        <div className="p-8 space-y-6">
          <div className="h-8 w-2/3 bg-gray-200 rounded" />
          <div className="h-6 w-24 bg-gray-200 rounded" />

          <div className="flex gap-6">
            <div className="h-4 w-32 bg-gray-200 rounded" />
            <div className="h-4 w-32 bg-gray-200 rounded" />
          </div>

          <div className="space-y-3">
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-3/4 bg-gray-200 rounded" />
          </div>

          <div className="h-10 w-40 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  /* ================= ERROR ================= */
  if (isSingleError || !event) {
    return (
      <div className="text-center text-red-500 py-20">
        Failed to load event details.
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
      {/* IMAGE */}
      <div className="relative w-full h-48 mt-2">
        <Image
          src={event.thumbnail}
          alt={event.title}
          fill
          className="object-contain"
        />
      </div>

      {/* CONTENT */}
      <div className="p-8 space-y-6">
        {/* TITLE + STATUS */}
        <div className="flex justify-between items-start flex-wrap gap-4">
          <h1 className="text-3xl font-bold">{event.title}</h1>

          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[event.status]
              }`}
          >
            {event.status}
          </span>
        </div>

        {/* META INFO */}
        <div className="flex flex-wrap gap-8 text-gray-600">
          <p>📅 {new Date(event.date).toLocaleDateString()}</p>
          <p>🏆 Prize: {event.prize}</p>
        </div>

        {/* DESCRIPTION */}
        <div className="space-y-2">
          <h2 className="font-semibold text-lg">About Event</h2>
          <p className="text-gray-600 leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* PARTNERS */}
        <div className="space-y-2">
          <h2 className="font-semibold text-lg">Partners</h2>
          <p className="text-gray-600">{event.partners}</p>
        </div>

        {/* CTA */}
        <button 
          onClick={handleRegister}
          className="bg-black text-white px-6 py-3 rounded-lg hover:scale-105 transition cursor-pointer"
          disabled={isCreatingRegistration}
        >
          {isCreatingRegistration ? <Spinner /> : "Register"}
        </button>
      </div>
    </div>
  );
}

export default EventDetails;