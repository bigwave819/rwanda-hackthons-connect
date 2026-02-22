"use client";

import { Sun, Moon, Menu } from "lucide-react";
import { useState, useEffect } from "react";

interface AdminNavProps {
  setSidebarOpen: (open: boolean) => void;
}

function AdminNav({ setSidebarOpen }: AdminNavProps) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", !darkMode ? "dark" : "light");
  };

  return (
    <header className="flex justify-between items-center bg-white border-b border-gray-200 p-4 shadow-sm">
      
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="p-3 rounded-full bg-gray-300 shadow-md hover:bg-gray-100 transition lg:hidden"
      >
        <Menu className="w-5 h-5 text-gray-800" />
      </button>

      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        className="p-3 rounded-full bg-white shadow-md hover:bg-gray-100 transition flex items-center justify-center"
        title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        {darkMode ? (
          <Moon className="w-5 h-5 text-gray-800" />
        ) : (
          <Sun className="w-5 h-5 text-yellow-500" />
        )}
      </button>
    </header>
  );
}

export default AdminNav;
