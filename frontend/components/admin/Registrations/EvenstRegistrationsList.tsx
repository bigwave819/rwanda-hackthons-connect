"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRegistrations } from "@/hooks/useRegistrations";

function EvenstRegistrationsList({ id }: { id: string }) {
  const { userRegistered, usersLoading, usersError } = useRegistrations(id);

  /* ================= SKELETON LOADING ================= */
  if (usersLoading) {
    return (
      <div className="w-full border rounded-xl bg-white shadow animate-pulse p-6 space-y-4">
        <div className="h-6 w-48 bg-gray-200 rounded" />

        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex justify-between">
              <div className="h-4 w-40 bg-gray-200 rounded" />
              <div className="h-4 w-56 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ================= ERROR ================= */
  if (usersError) {
    return (
      <div className="text-center text-red-500 py-10">
        Failed to load registrations
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="w-full overflow-x-auto rounded-xl border bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User Name</TableHead>
            <TableHead>User Email</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {userRegistered?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={2} className="text-center py-10 text-muted-foreground">
                No users registered yet
              </TableCell>
            </TableRow>
          ) : (
            userRegistered?.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  {item.user.fullName}
                </TableCell>
                <TableCell>{item.user.email}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default EvenstRegistrationsList;