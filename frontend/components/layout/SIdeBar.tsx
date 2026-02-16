"use client";

import { LogOut, Home, Calendar, Users, ClipboardList, X } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

function SideBar({ isOpen, setIsOpen }: SidebarProps) {
  const links = [
    { name: "Dashboard", path: "/admin/dashboard", icon: Home },
    { name: "Events", path: "/admin/events", icon: Calendar },
    { name: "Users", path: "/admin/users", icon: Users },
    { name: "Registrations", path: "/admin/registrations", icon: ClipboardList },
  ];

  const { logout } = useAuthStore();

  return (
    <>
      {/* Overlay for small screens */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-48 bg-white border-r border-gray-200 shadow-md p-4 z-50
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:static lg:flex flex-col justify-between
        `}
      >
        {/* Close button on mobile */}
        <div className="flex justify-end lg:hidden mb-4">
          <button onClick={() => setIsOpen(false)} className="p-2 rounded-full hover:bg-gray-100 transition">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Links */}
        <nav className="space-y-4 flex-1">
          {links.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className="flex items-center px-4 py-2 space-x-3 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition"
              >
                <Icon className="w-5 h-5 text-gray-600" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <button
          onClick={logout}
          className="flex items-center justify-center space-x-2 w-full px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 font-medium transition mt-4"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </aside>
    </>
  );
}

export default SideBar;
