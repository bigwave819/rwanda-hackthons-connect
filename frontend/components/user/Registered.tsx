"use client";

import { useRegistrations } from "@/hooks/useRegistrations";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Calendar, Trophy } from "lucide-react";

function RegisteredEvents() {
  const { registrations, isLoading, error } = useRegistrations();

  /* ================= ERROR ================= */
  if (error) {
    return (
      <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600">
        Failed to load registrations
      </div>
    );
  }

  /* ================= SKELETON ================= */
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-14 bg-gray-200 rounded animate-pulse"
          />
        ))}
      </div>
    );
  }

  /* ================= EMPTY ================= */
  if (!registrations) {
    return (
      <div className="text-center py-20 text-gray-500">
        No registered events yet.
      </div>
    );
  }

  /* ================= STATUS COLORS ================= */
  const statusColors = {
    OPEN: "bg-blue-100 text-blue-600",
    CLOSED: "bg-red-100 text-red-600",
    FINISHED: "bg-green-100 text-green-600",
  };

  /* ================= UI ================= */
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Event</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Prize</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {registrations.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">
                {item.title}
              </TableCell>

              <TableCell>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    statusColors[item.status]
                  }`}
                >
                  {item.status}
                </span>
              </TableCell>

              <TableCell className="flex items-center gap-2">
                <Trophy size={16} />
                {item.prize} RWF
              </TableCell>

              <TableCell className="flex items-center gap-2 text-gray-600">
                <Calendar size={16} />
                {new Date(item.date).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default RegisteredEvents;