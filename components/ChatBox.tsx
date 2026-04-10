"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";

export default function Chat() {
  const [input, setInput] = useState("");
  const { messages, sendMessage } = useChat();
  return (
    <div className="flex flex-col w-full h-full px-4 py-8">
      {/* 消息列表区域 */}
      <div className="flex-1 space-y-6 mb-24 max-w-300">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-3 whitespace-pre-wrap ${
                message.role === "user"
                  ? "bg-blue-500 text-white rounded-br-sm"
                  : "bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 rounded-bl-sm"
              }`}
            >
              {message.parts.map((part, i) => {
                switch (part.type) {
                  case "text":
                    return (
                      <div
                        key={`${message.id}-${i}`}
                        className="text-sm leading-relaxed"
                      >
                        {part.text}
                      </div>
                    );
                }
              })}
            </div>
          </div>
        ))}
      </div>

      {/* 输入框区域 */}
      <div className="h-200 bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-700 p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage({ text: input });
            setInput("");
          }}
          className="fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-700 p-4"
        >
          <div className="max-w-3xl mx-auto flex gap-2">
            <input
              className="flex-1 p-3 border border-gray-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              value={input}
              placeholder="输入消息..."
              onChange={(e) => setInput(e.currentTarget.value)}
            />
            <button type="submit" className="edit-button">
              发送
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
