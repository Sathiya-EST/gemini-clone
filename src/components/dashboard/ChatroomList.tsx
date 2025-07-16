"use client";

import { useState } from "react";
import { useChatStore } from "../../store/chatStore";
import { CreateChatroom } from "./CreateChatroom";
import { SearchBar } from "./SearchBar";
import { Button } from "../ui/button";
import { formatTimestamp } from "../../lib/utils";
import { Trash2, MessageCircle, Plus } from "lucide-react";
import { toast } from "react-hot-toast";
import Link from "next/link";

export const ChatroomList: React.FC = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { chatrooms, deleteChatroom, getFilteredChatrooms } = useChatStore();

  const filteredChatrooms = getFilteredChatrooms();

  const handleDeleteChatroom = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteChatroom(id);
      toast.success("Chatroom deleted successfully");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Chatrooms</h1>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Chat
        </Button>
      </div>

      <SearchBar />

      {showCreateForm && (
        <CreateChatroom
          onClose={() => setShowCreateForm(false)}
          onSuccess={() => {
            setShowCreateForm(false);
            toast.success("Chatroom created successfully");
          }}
        />
      )}

      <div className="grid gap-4">
        {filteredChatrooms.length === 0 ? (
          <div className="text-center py-8">
            <MessageCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">No chatrooms found</p>
            <p className="text-sm text-gray-400 mt-1">
              Create your first chatroom to get started
            </p>
          </div>
        ) : (
          filteredChatrooms.map((chatroom) => (
            <div
              key={chatroom.id}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <Link
                  href={`/chat/${chatroom.id}`}
                  className="flex-1 hover:text-blue-500 transition-colors"
                >
                  <h3 className="font-semibold text-lg">{chatroom.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Created {formatTimestamp(chatroom.createdAt)}
                  </p>
                  {chatroom.lastMessage && (
                    <p className="text-sm text-gray-600 mt-1 truncate">
                      {chatroom.lastMessage}
                    </p>
                  )}
                </Link>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    handleDeleteChatroom(chatroom.id, chatroom.title)
                  }
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
