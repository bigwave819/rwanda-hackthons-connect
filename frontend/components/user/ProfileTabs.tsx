"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileView from "./ProfileView";
import UpdatePassword from "./UpdatePassword";

export default function ProfileTabs() {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="profile">My Profile</TabsTrigger>
          <TabsTrigger value="password">Update Password</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <ProfileView />
        </TabsContent>

        <TabsContent value="password" className="mt-6">
          <UpdatePassword />
        </TabsContent>
      </Tabs>
    </div>
  );
}