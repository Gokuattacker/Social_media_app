"use client";

import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { chatUsersData, chatMessagesData } from "./data";

interface User {
  id: number;
  name: string;
  username: string;
  avatar: string;
  lastMessage: string;
  time: string;
}

interface Message {
  id: number;
  sender: string;
  text: string;
  time: string;
}

const MessagesPage = () => {
  const [chatUsers] = useState<User[]>(chatUsersData);

  const [selectedUser, setSelectedUser] = useState<User | null>(
    chatUsersData[0],
  );

  const [messages, setMessages] = useState<Message[]>(
    chatMessagesData[
      chatUsersData[0].username as keyof typeof chatMessagesData
    ] || [],
  );

  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    document.body.style.overflow = "auto";
  }, []);

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setMessages(
      chatMessagesData[user.username as keyof typeof chatMessagesData] || [],
    );
  };

  const handleSendMessage = () => {
    if (!selectedUser) return;

    if (newMessage.trim()) {
      const msg: Message = {
        id: messages.length + 1,
        sender: "me",
        text: newMessage,
        time: "now",
      };

      setMessages([...messages, msg]);
      setNewMessage("");
    }
  };

  return (
    <div className="w-full h-[calc(100vh-64px)] overflow-hidden bg-zinc-50 dark:bg-zinc-950">
      <div className="w-full h-full flex min-h-0">
        {/* Chat List */}
        <div className="w-85 shrink-0 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col min-h-0">
          {/* Header */}
          <div className="p-3 border-b border-zinc-200 dark:border-zinc-800">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              Messages
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Your chats
            </p>
          </div>

          {/* User List Scroll */}
          <div className="flex-1 overflow-y-auto min-h-0">
            {chatUsers.map((user) => (
              <button
                key={user.id}
                onClick={() => handleSelectUser(user)}
                className={`w-full text-left flex items-center gap-3 p-4 border-b border-zinc-200 dark:border-zinc-800 transition-colors ${
                  selectedUser?.id === user.id
                    ? "bg-indigo-50 dark:bg-indigo-950/30"
                    : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-2xl">
                  {user.avatar}
                </div>

                <div className="flex-1 overflow-hidden">
                  <p className="font-bold text-zinc-900 dark:text-zinc-100 truncate">
                    {user.name}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 truncate">
                    {user.lastMessage}
                  </p>
                </div>

                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  {user.time}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Box */}
        <div className="flex-1 flex flex-col bg-white dark:bg-zinc-900 min-h-0">
          {/* Chat Header */}
          <div className="p-3 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-3 shrink-0">
            <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-2xl">
              {selectedUser?.avatar}
            </div>

            <div>
              <p className="font-bold text-zinc-900 dark:text-zinc-100">
                {selectedUser?.name}
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                @{selectedUser?.username}
              </p>
            </div>
          </div>

          {/* Messages Scroll */}
          <div className="flex-1 overflow-y-auto min-h-0 p-6 space-y-4 bg-zinc-50 dark:bg-zinc-950">
            {messages.length === 0 ? (
              <p className="text-center text-zinc-500 dark:text-zinc-400 mt-10">
                No messages yet 😢
              </p>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "me" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] px-4 py-3 rounded-2xl shadow-sm ${
                      msg.sender === "me"
                        ? "bg-indigo-600 text-white"
                        : "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <p
                      className={`text-xs mt-2 ${
                        msg.sender === "me"
                          ? "text-indigo-100"
                          : "text-zinc-500 dark:text-zinc-400"
                      }`}
                    >
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Input Box */}
          <div className="p-5 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-3 shrink-0 bg-white dark:bg-zinc-900">
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-3 border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-zinc-900 dark:text-zinc-100"
            />

            <Button
              label="Send"
              className="px-6 py-3 rounded-2xl bg-indigo-600 text-white border-none hover:bg-indigo-500"
              onClick={handleSendMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
