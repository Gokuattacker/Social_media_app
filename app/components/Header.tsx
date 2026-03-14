"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [pathname]);

  return (
    <nav className="w-full sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/70">
      <div className="w-full px-4 md:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <button
          type="button"
          onClick={() => router.push("/")}
          className="text-lg md:text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
        >
          <span className="text-indigo-600 dark:text-indigo-400">Social</span>
          Connect
        </button>

        {/* Right Side Buttons */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {isLoggedIn ? (
            // Logged in: show only Profile button
            <Button
              label="Profile"
              className="px-4 py-2 text-sm font-semibold rounded-xl bg-indigo-600 text-white border-none hover:bg-indigo-500"
              onClick={() => router.push("/profilePage")}
            />
          ) : (
            // Logged out: show Sign In + Get Started
            <>
              <Button
                label="Sign In"
                className="px-4 py-2 text-sm font-semibold rounded-xl border border-zinc-200 text-zinc-800 bg-white hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800"
                outlined
                onClick={() => router.push("/loginPage")}
              />
              <Button
                label="Get Started"
                className="px-4 py-2 text-sm font-semibold rounded-xl bg-indigo-600 text-white border-none hover:bg-indigo-500"
                onClick={() => router.push("/signupPage")}
              />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;