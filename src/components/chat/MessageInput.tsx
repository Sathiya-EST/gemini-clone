"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { messageSchema } from "../../lib/validations";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ImageUpload } from "../common/ImageUpload";
import { useChatStore } from "../../store/chatStore";
import { Send, Image, X } from "lucide-react";
import { toast } from "react-hot-toast";

export const MessageInput: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const { sendMessage, currentChatroom } = useChatStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(messageSchema),
  });

  const onSubmit = (data: any) => {
    if (!currentChatroom) {
      toast.error("Please select a chatroom first");
      return;
    }

    sendMessage(data.content, selectedImage || undefined);
    reset();
    setSelectedImage(null);
    setShowImageUpload(false);

    // Focus back to input
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  const handleImageSelected = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setShowImageUpload(false);
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
  };

  // Get the register function without ref
  const { ref: registerRef, ...registerProps } = register("content");

  return (
    <div className="space-y-2">
      {selectedImage && (
        <div className="flex items-center gap-2 p-2 bg-gray-100 dark:bg-gray-800 rounded">
          <img
            src={selectedImage}
            alt="Selected"
            className="w-10 h-10 rounded object-cover"
          />
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Image selected
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={removeSelectedImage}
            className="ml-auto"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2"
      >
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => {
            setShowImageUpload(true);
            console.log("Open image upload modal");
          }}
          className="shrink-0"
        >
          <Image className="h-4 w-4" />
        </Button>

        <Input
          ref={(e) => {
            registerRef(e);
            inputRef.current = e;
          }}
          placeholder="Type a message..."
          {...registerProps}
          onKeyPress={handleKeyPress}
          className="flex-1"
        />

        <Button type="submit" size="icon" className="shrink-0">
          <Send className="h-4 w-4" />
        </Button>
      </form>

      {errors.content && (
        <p className="text-red-500 text-sm">{errors.content.message}</p>
      )}
      {showImageUpload && (
        <ImageUpload
          onImageSelected={handleImageSelected}
          onClose={() => setShowImageUpload(false)}
        />
      )}
    </div>
  );
};
