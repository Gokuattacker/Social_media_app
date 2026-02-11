"use client";

import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { userProfile, suggestions, notificationsData } from "./data";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(notificationsData);

  useEffect(() => {
    document.body.style.overflow = "auto";
  }, []);

  const markAsRead = (id: string | number) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const getIcon = (type: string) => {
    if (type === "like") return "❤️";
    if (type === "follow") return "➕";
    if (type === "comment") return "💬";
    return "🔔";
  };

  return (
    <section className="w-full px-6 md:px-12 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm p-6 border border-zinc-200 dark:border-zinc-800">
                <div className="text-center mb-4">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-indigo-600 flex items-center justify-center text-4xl text-white">
                    {userProfile.avatar}
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                    {userProfile.name}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                    @{userProfile.username}
                  </p>
                </div>

                <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4 mt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-zinc-600 dark:text-zinc-400">
                      Posts
                    </span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">
                      {userProfile.stats.posts}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-zinc-600 dark:text-zinc-400">
                      Followers
                    </span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">
                      {userProfile.stats.followers}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-600 dark:text-zinc-400">
                      Following
                    </span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">
                      {userProfile.stats.following}
                    </span>
                  </div>
                </div>
              </div>

              {/* Suggestions */}
              <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm p-6 mt-6 border border-zinc-200 dark:border-zinc-800">
                <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                  Suggestions
                </h4>

                <div className="space-y-4">
                  {suggestions.map((user, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-lg">
                          {user.avatar}
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                            {user.username}
                          </p>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            {user.description}
                          </p>
                        </div>
                      </div>

                      <Button
                        label="Follow"
                        className="px-4 py-1 text-xs rounded-xl bg-indigo-600 text-white border-none hover:bg-indigo-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Notifications Main */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm p-6 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  Notifications 🔔
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                  Stay updated with likes, comments, and followers.
                </p>
              </div>

              <Button
                label="Mark all as read"
                className="px-4 py-2 rounded-2xl bg-indigo-600 text-white border-none hover:bg-indigo-500 text-sm"
                onClick={markAllAsRead}
              />
            </div>

            {/* Notification List */}
            <div className="space-y-4">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={`flex items-center gap-4 p-5 rounded-2xl border shadow-sm transition-all ${
                    n.read
                      ? "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
                      : "bg-indigo-50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-900"
                  }`}
                >
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-2xl">
                    {n.avatar}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <p className="text-zinc-900 dark:text-zinc-100 font-semibold">
                      <span className="font-bold">@{n.user}</span> {n.message}
                    </p>

                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                      {getIcon(n.type)} {n.time} ago
                    </p>
                  </div>

                  {/* Mark as Read */}
                  {!n.read && (
                    <Button
                      label="Read"
                      className="px-4 py-2 rounded-2xl bg-indigo-600 text-white border-none hover:bg-indigo-500 text-sm"
                      onClick={() => markAsRead(n.id)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotificationsPage;
