"use client";

import { useState } from "react";
import { Message as MessageType } from "../../types";
import { formatTimestamp, copyToClipboard } from "../../lib/utils";
import { Button } from "../ui/button";
import { Copy, Check, Trash, Edit, X, Brain, User } from "lucide-react";
import { toast } from "react-hot-toast";
import ImageModal from "./ImageModal";
import Image from "next/image";

interface MessageProps {
  message: MessageType;
  onUpdateMessage: (id: string, newContent: string) => void;
  onDeleteMessage: (id: string) => void;
}

export const MessageComponent: React.FC<MessageProps> = ({
  message,
  onUpdateMessage,
  onDeleteMessage,
}) => {
  const [showActions, setShowActions] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(message.content);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCopy = async () => {
    const success = await copyToClipboard(message.content);
    if (success) {
      setCopied(true);
      toast.success("Message copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error("Failed to copy message");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(message.content);
  };

  const handleSaveEdit = () => {
    if (editedContent.trim() === "") {
      toast.error("Message cannot be empty.");
      return;
    }
    onUpdateMessage(message.id, editedContent);
    setIsEditing(false);
    toast.success("Message updated!");
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent(message.content);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      onDeleteMessage(message.id);
      toast.success("Message deleted!");
    }
  };

  const isUser = message.sender === "user";

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {!isUser && (
        <div className="mr-2 flex-shrink-0">
          <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-xs font-semibold">
            <Brain className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-xl rounded-xl shadow-md" />
          </div>
        </div>
      )}

      <div
        className={`max-w-[70%] min-w-[40%] p-3 relative group transition-all duration-200 ${
          isUser
            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-xl rounded-bl-xl shadow-md"
            : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-t-xl rounded-br-xl shadow-sm"
        }`}
      >
        <>
          {message.image && (
            <div className="mb-2">
              <div
                className="cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setIsModalOpen(true)}
              >
                <Image
                  src={message.image}
                  alt="Uploaded"
                  width={400}
                  height={300}
                  className="max-w-full h-auto rounded-md border border-gray-200 dark:border-gray-700"
                  quality={75}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              <div className="text-xs text-gray-500 mt-1 opacity-0 hover:opacity-100 transition-opacity">
                Click to view full size
              </div>
            </div>
          )}

          {/* Modal */}
          <ImageModal
            src={message.image ?? ""}
            alt="Uploaded image preview"
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </>
        {isEditing ? (
          <textarea
            className={`w-full p-2 rounded-md resize-none text-sm ${
              isUser
                ? "bg-blue-700 text-white placeholder-blue-300"
                : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
            }`}
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            rows={Math.max(1, editedContent.split("\n").length)}
            placeholder="Edit your message..."
          />
        ) : (
          <p className="text-sm break-words whitespace-pre-wrap">
            {message.content}
          </p>
        )}

        <div className="flex items-center justify-between mt-2">
          <span
            className={`text-xs ${
              isUser ? "text-white/70" : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {formatTimestamp(message.timestamp)}
          </span>

          {showActions && (
            <div
              className={`flex space-x-1 transition-all duration-300 ${
                isUser ? "text-white" : "text-gray-600 dark:text-gray-300"
              }`}
            >
              {isEditing ? (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleSaveEdit}
                    className="p-0.5 h-auto w-auto rounded-full hover:bg-white/20"
                    title="Save"
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCancelEdit}
                    className="p-0.5 h-auto w-auto rounded-full hover:bg-white/20"
                    title="Cancel"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCopy}
                    className="p-0.5 h-auto w-auto rounded-full hover:bg-white/20"
                    title="Copy"
                  >
                    {copied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>

                  {isUser && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleEdit}
                        className="p-0.5 h-auto w-auto rounded-full hover:bg-white/20"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleDelete}
                        className="p-0.5 h-auto w-auto rounded-full hover:bg-red-500/30 text-red-300" 
                        title="Delete"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
      {isUser && (
        <div className="ml-3 flex-shrink-0">
          <div className="relative group">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-400 dark:to-blue-500 flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-200 ring-2 ring-blue-100 dark:ring-blue-900/50 hover:ring-blue-200 dark:hover:ring-blue-800/50">
              <User className="h-5 w-5" />
            </div>

            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-800 shadow-sm">
              <div className="h-full w-full rounded-full bg-green-500 animate-pulse"></div>
            </div>

            <div className="absolute inset-0 rounded-full bg-blue-600/20 scale-0 group-hover:scale-110 transition-transform duration-300 ease-out"></div>
          </div>
        </div>
      )}
    </div>
  );
};
