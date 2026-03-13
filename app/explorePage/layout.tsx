import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import MobileNav from "../components/MobileNav";

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 pb-20 lg:pb-0">{children}</div>
      </div>
      <Footer />
      <MobileNav />
    </div>
  );
}
