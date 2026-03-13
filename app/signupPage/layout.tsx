import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <Header />
      <div className="flex">
        <div className="flex-1">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
