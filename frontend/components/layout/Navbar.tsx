"use client";
import { Menu, Sun, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import UserAvatar from "./Avatar";

function Navbar() {
  const links = [
    {
      id: 1,
      label: "Home",
      path: "/",
    },
    {
      id: 2,
      label: "Events",
      path: "/events",
    },
  ];
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const pathName = usePathname()

  if (pathName.startsWith("/admin")) return null;
  return (
    <div>
      <nav className="w-full px-10 py-5 flex justify-between">
        {/** Header */}
        <div>
          <h1 className="md:text-xl font-bold">Rwanda-Hackethon-connect</h1>
        </div>

        <div className="hidden lg:flex">
          {links.map((item) => {
            return (
              <ul key={item.id}>
                <li className="mr-5">
                  <Link
                    href={`${item.path}`}
                    className="font-bold text-gray-700"
                  >
                    {item.label}
                  </Link>
                </li>
              </ul>
            );
          })}
        </div>

        <div className="flex space-x-5 cursor-pointer">
          <button className="p-3 rounded-full bg-white text-gray-900 border shadow-md border-gray-100">
            <Sun />
          </button>
          <UserAvatar />
          <button
            onClick={() => setOpen(true)}
            className="p-3 lg:hidden rounded-full bg-white text-gray-900"
          >
            <Menu />
          </button>

          {open && (
            <div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={() => setOpen(false)}
            />
          )}

          <div
            className={`fixed top-0 right-0 h-full w-64 bg-gray-100 shadow-xl transform transition-transform duration-300 z-50 ${
              open ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <ul className="flex flex-col space-y-6 p-6 text-lg font-medium">
              {links.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.path}
                    onClick={() => setOpen(false)}
                    className={"text-gray-800"}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex justify-center w-full px-5">
              <button className="bg-white text-black w-full shadow-md font-bold rounded-full px-4 py-1 cursor-pointer text-md">
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
