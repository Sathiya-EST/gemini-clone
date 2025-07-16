// "use client";

// import { useState, useRef } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { messageSchema } from "../../lib/validations";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";
// import { ImageUpload } from "../common/ImageUpload";
// import { useChatStore } from "../../store/chatStore";
// import { Send, X, Plus } from "lucide-react";
// import { toast } from "react-hot-toast";
// import {
//   Dialog,
//   DialogContent,
//   DialogTitle,
// } from "../ui/dialog";

// export const MessageInput: React.FC = () => {
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [isImageUploadOpen, setIsImageUploadOpen] = useState(false);
//   const { sendMessage, currentChatroom } = useChatStore();
//   const inputRef = useRef<HTMLInputElement>(null);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(messageSchema),
//   });

//   const onSubmit = (data: { content: string }) => {
//     if (!currentChatroom) {
//       toast.error("Please select a chatroom first");
//       return;
//     }

//     sendMessage(data.content, selectedImage || undefined);
//     reset();
//     setSelectedImage(null);
//     setIsImageUploadOpen(false);
//     if (inputRef.current) {
//       inputRef.current.focus();
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSubmit(onSubmit)();
//     }
//   };

//   const handleImageSelected = (imageUrl: string) => {
//     setSelectedImage(imageUrl);
//     setIsImageUploadOpen(false);
//     if (inputRef.current) {
//       inputRef.current.focus();
//     }
//   };

//   const removeSelectedImage = () => {
//     setSelectedImage(null);
//   };

//   const { ref: registerRef, ...registerProps } = register("content");

//   return (
//     <div className="space-y-2">
//       {selectedImage && (
//         <div className="flex items-center gap-2 p-2 bg-gray-100 dark:bg-gray-800 rounded">
//           <img
//             src={selectedImage}
//             alt="Selected"
//             className="w-10 h-10 rounded object-cover"
//           />
//           <span className="text-sm text-gray-600 dark:text-gray-300">
//             Image selected
//           </span>
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={removeSelectedImage}
//             className="ml-auto"
//           >
//             <X className="h-4 w-4" />
//           </Button>
//         </div>
//       )}

//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="flex items-center gap-2"
//       >
//         <Button
//           type="button"
//           variant="outline"
//           size="icon"
//           onClick={() => setIsImageUploadOpen(true)}
//           className="shrink-0"
//         >
//           <Plus className="h-4 w-4" />
//         </Button>

//         <Input
//           ref={(e) => {
//             registerRef(e);
//             inputRef.current = e;
//           }}
//           placeholder="Type a message..."
//           {...registerProps}
//           onKeyPress={handleKeyPress}
//           className="flex-1"
//         />

//         <Button type="submit" size="icon" className="shrink-0">
//           <Send className="h-4 w-4" />
//         </Button>
//       </form>

//       {errors.content && (
//         <p className="text-red-500 text-sm">{errors.content.message}</p>
//       )}

//       <Dialog open={isImageUploadOpen} onOpenChange={setIsImageUploadOpen}>
//         <DialogContent className="sm:max-w-md">
//           <DialogTitle>
//             <h3 className="font-semibold">Upload Image</h3>
//           </DialogTitle>
//           <ImageUpload
//             onImageSelected={handleImageSelected}
//             onClose={() => setIsImageUploadOpen(false)}
//           />
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };
"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { messageSchema } from "../../lib/validations";
import { Button } from "../ui/button";
import { ImageUpload } from "../common/ImageUpload";
import { useChatStore } from "../../store/chatStore";
import { Send, X, Plus, Paperclip } from "lucide-react";
import { toast } from "react-hot-toast";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";

export const MessageInput: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isImageUploadOpen, setIsImageUploadOpen] = useState(false);
  const { sendMessage, currentChatroom } = useChatStore();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(messageSchema),
  });

  const messageContent = watch("content", "");

  const onSubmit = (data: { content: string }) => {
    if (!currentChatroom) {
      toast.error("Please select a chatroom first");
      return;
    }

    sendMessage(data.content, selectedImage || undefined);
    reset();
    setSelectedImage(null);
    setIsImageUploadOpen(false);
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
    setIsImageUploadOpen(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
  };

  const { ref: registerRef, ...registerProps } = register("content");

  // Auto-resize textarea
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
  };

  return (
    <div className="relative">
      {/* Selected Image Preview */}
      {selectedImage && (
        <div className="mb-3 flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="relative">
            <img
              src={selectedImage}
              alt="Selected"
              className="w-12 h-12 rounded-lg object-cover border border-gray-200 dark:border-gray-600"
            />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Image attached
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={removeSelectedImage}
            className="h-8 w-8 p-0 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Main Input Container */}
      <div className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm focus-within:shadow-md focus-within:border-blue-500 dark:focus-within:border-blue-400 transition-all duration-200">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center py-5 px-2 gap-2"
        >
          {/* Attachment Button */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setIsImageUploadOpen(true)}
            className="h-9 w-9 shrink-0 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            <Plus className="h-4 w-4" />
          </Button>

          {/* Text Input */}
          <div className="flex-1 min-w-0">
            <textarea
              ref={(e) => {
                registerRef(e);
                inputRef.current = e;
              }}
              placeholder="Message..."
              {...registerProps}
              onKeyPress={handleKeyPress}
              onChange={(e) => {
                registerProps.onChange(e);
                handleTextareaChange(e);
              }}
              className="w-full resize-none bg-transparent border-0 outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 text-sm leading-5 max-h-[80vh] min-h-[50vh]] py-1"
              rows={1}
              style={{ height: "2rem" }}
            />
          </div>

          {/* Send Button */}
          <Button
            type="submit"
            size="icon"
            disabled={!messageContent?.trim()}
            className="h-9 w-9 shrink-0 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors rounded-full"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>

        {/* Error Message */}
        {errors.content && (
          <div className="px-3 pb-2">
            <p className="text-red-500 text-xs">{errors.content.message}</p>
          </div>
        )}
      </div>

      {/* Character Count (Optional) */}
      {messageContent && (
        <div className="mt-1 text-right">
          <span className="text-xs text-gray-400 dark:text-gray-500">
            {messageContent.length} characters
          </span>
        </div>
      )}

      {/* Image Upload Dialog */}
      <Dialog open={isImageUploadOpen} onOpenChange={setIsImageUploadOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle>
            <p className="font-semibold text-xl">Upload Image</p>
          </DialogTitle>
          <ImageUpload
            onImageSelected={handleImageSelected}
            onClose={() => setIsImageUploadOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
