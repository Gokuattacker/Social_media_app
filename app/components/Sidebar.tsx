"use client";

import { useRouter, usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { label: "Home", path: "/feedPage" },
    { label: "Explore", path: "/explorePage" },
    { label: "Create Post", path: "/create" },
    { label: "Messages", path: "/messagePage" },
    { label: "Notifications", path: "/notificationPage" },
    { label: "Profile", path: "/profilePage" },
    { label: "Settings", path: "/settings" },
    { label: "Logout", path: "/logout" },
  ];

  const handleNavigation = (path: string) => {
    if (path === "/logout") {
      router.push("/");
    } else {
      router.push(path);
    }
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <aside className="hidden lg:block w-64 min-h-[calc(100vh-64px)] sticky top-16">
      <div className="h-full bg-white border-r border-zinc-200 p-4 overflow-y-auto dark:bg-zinc-950 dark:border-zinc-800">
        <div className="mb-4 px-2"></div>

        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavigation(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive(item.path)
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"
              }`}
            >
              <span className="font-semibold">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
