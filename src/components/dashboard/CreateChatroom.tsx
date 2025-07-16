"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { chatroomSchema } from "../../lib/validations";
import { useChatStore } from "../../store/chatStore";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";

interface CreateChatroomProps {
  onClose: () => void;
  onSuccess: (id: string) => void;
}

export const CreateChatroom: React.FC<CreateChatroomProps> = ({
  onClose,
  onSuccess,
}) => {
  const { createChatroom } = useChatStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(chatroomSchema),
  });

  const onSubmit = (data: { title: string; id?: string }) => {
    onClose();
    reset();
    const newChatroomId = createChatroom(data.title);
    if (typeof newChatroomId === "string") {
      onSuccess(newChatroomId);
    }
  };
  const handleCancel = () => {
    reset();
    onClose();
  };
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Create New Chatroom</DialogTitle>
        <DialogDescription>
          Enter a title for your new chatroom.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
        <div>
          <Input
            placeholder="Enter chatroom title..."
            {...register("title")}
            className={errors.title ? "border-red-500" : ""}
            autoFocus
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>
        <DialogFooter>
          {" "}
          {/* Use DialogFooter for consistency with Shadcn dialogs */}
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit">Create</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};
