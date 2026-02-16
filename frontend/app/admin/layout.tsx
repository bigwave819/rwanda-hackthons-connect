"use client";

import { useState } from "react";
import AdminNav from "@/components/layout/AdminNav";
import SideBar from "@/components/layout/SIdeBar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      
      {/* Sidebar */}
      <SideBar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <AdminNav setSidebarOpen={setSidebarOpen} />
        <main className="p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
