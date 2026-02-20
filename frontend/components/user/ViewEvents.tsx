"use client";

import { useEvents } from "@/hooks/useEvents";
import { useState, useMemo } from "react";
import { LayoutGrid, List } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type EventStatus = "OPEN" | "CLOSED" | "FINISHED";

function ViewEvents() {
  const { events, error, isLoading } = useEvents();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<EventStatus | "ALL">("ALL");
  const [viewMode, setViewMode] = useState<"card" | "list">("card");

  /* ================= FILTER ================= */
  const filteredEvents = useMemo(() => {
    if (!events) return [];

    return events.filter((event) => {
      const matchesSearch = event.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "ALL" || event.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [events, search, statusFilter]);

  /* ================= STATUS COLORS ================= */
  const statusColors: Record<EventStatus, string> = {
    OPEN: "bg-blue-100 text-blue-600",
    CLOSED: "bg-red-100 text-red-600",
    FINISHED: "bg-green-100 text-green-600",
  };

  /* ================= SKELETON ================= */
  const SkeletonCard = () => (
    <div className="animate-pulse bg-white rounded-xl shadow p-4 space-y-3">
      <div className="h-40 bg-gray-200 rounded" />
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-full" />
      <div className="h-3 bg-gray-200 rounded w-1/2" />
    </div>
  );

  /* ================= LOADING ================= */
  if (isLoading) {
    return (
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  /* ================= ERROR ================= */
  if (error) {
    return (
      <div className="bg-red-100 text-red-600 p-4 rounded-lg text-center">
        Failed to load events.
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* ================= CONTROLS CENTERED ================= */}
      <div className="flex flex-col items-center gap-4">
        <input
          type="search"
          placeholder="Search events..."
          className="border px-4 py-2 rounded-lg w-full max-w-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex gap-3 items-center">
          <select
            className="border px-3 py-2 rounded-lg"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
          >
            <option value="ALL">All Status</option>
            <option value="OPEN">Upcoming</option>
            <option value="CLOSED">Closed</option>
            <option value="FINISHED">Finished</option>
          </select>

          {/* ICON TOGGLE */}
          <div className="flex border rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode("card")}
              className={`p-2 ${
                viewMode === "card" && "bg-black text-white"
              }`}
            >
              <LayoutGrid size={18} />
            </button>

            <button
              onClick={() => setViewMode("list")}
              className={`p-2 ${
                viewMode === "list" && "bg-black text-white"
              }`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* ================= EMPTY ================= */}
      {filteredEvents.length === 0 && (
        <div className="text-center text-gray-500">
          No events found.
        </div>
      )}

      {/* ================= CARD VIEW ================= */}
      {viewMode === "card" && (
        <div className="grid md:grid-cols-3 gap-6 justify-center">
          {filteredEvents.map((event) => (
            <Link key={event.id} href={`/events/${event.id}`}>
              <div
              
              className="bg-white shadow rounded-xl overflow-hidden hover:shadow-lg transition max-w-sm mx-auto"
            >
              <div className="relative w-full h-48 mt-2">
                      <Image
                        src={event.thumbnail}
                        alt={event.title}
                        fill
                        className="object-contain"
                      />
                    </div>

              <div className="p-4 space-y-2">
                <h2 className="font-semibold text-lg">
                  {event.title}
                </h2>

                <span
                  className={`px-3 py-1 text-xs rounded-full ${statusColors[event.status]}`}
                >
                  {event.status}
                </span>

                <p className="text-sm text-gray-600 line-clamp-2">
                  {event.description}
                </p>

                <p className="text-sm text-gray-500">
                  {new Date(event.date).toLocaleDateString()}
                </p>
              </div>
            </div>
            </Link>
          ))}
        </div>
      )}

      {/* ================= LIST VIEW ================= */}
      {viewMode === "list" && (
        <div className="space-y-4">
          {filteredEvents.map((event) => (
            <Link key={event.id} href={`/events/${event.id}`}>
              <div
              className="flex gap-4 bg-white p-4 rounded-xl shadow hover:shadow-md max-w-3xl mx-auto"
            >
              <img
                src={event.thumbnail}
                className="w-28 h-20 object-cover rounded-lg"
              />

              <div className="flex-1 space-y-1">
                <h2 className="font-semibold text-lg">
                  {event.title}
                </h2>

                <span
                  className={`px-3 py-1 text-xs rounded-full ${statusColors[event.status]}`}
                >
                  {event.status}
                </span>

                <p className="text-sm text-gray-600 line-clamp-2">
                  {event.description}
                </p>
              </div>
            </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewEvents;