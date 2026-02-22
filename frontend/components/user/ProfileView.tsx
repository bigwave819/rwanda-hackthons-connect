"use client";
import { useUsers } from "@/hooks/useUsers";

export default function ProfileView() {
  const { user, isSingleLoading, isSingleError } = useUsers()
    


  if (isSingleError instanceof Error) {
        return (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200">
                <h1 className="text-red-700 font-semibold">
                    Failed to load the data
                </h1>
            </div>
        );
    }

  if (isSingleLoading || !user) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-6 w-40 bg-gray-200 rounded" />
        <div className="h-6 w-60 bg-gray-200 rounded" />
        <div className="h-6 w-32 bg-gray-200 rounded" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Profile Information</h2>

      <div className="grid gap-4">
        <ProfileItem label="Full Name" value={user.fullName} />
        <ProfileItem label="Email" value={user.email} />
        <ProfileItem label="Role" value={user.role} />
        <ProfileItem
          label="Joined"
          value={new Date(user.createdAt).toLocaleDateString()}
        />
      </div>
    </div>
  );
}

function ProfileItem({ label, value }: any) {
  return (
    <div className="flex justify-between border-b pb-3">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}