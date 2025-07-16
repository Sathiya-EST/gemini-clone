"use client";

import { useAuth } from "../../hooks/useAuth";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { Button } from "../../components/ui/button";
import { MessageSquarePlus } from "lucide-react";
import { useChatStore } from "../../store/chatStore";
import { useRouter } from "next/navigation";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CreateChatroom } from "@/components/dashboard/CreateChatroom";
import toast from "react-hot-toast";
import { useState } from "react";

export default function DashboardPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const handleCreateChat = (id: string) => {
    router.push(`/chat/${id}`);
  };
  if (!isAuthenticated) {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold mb-2 bg-gradient-to-r from-blue-500 to-blue-700 text-transparent bg-clip-text">
              Hello, User Name
            </h1>
          </div>
          <div className="flex justify-center mt-4">
            <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
              <DialogTrigger asChild className="flex gap-x-2">
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  size="lg"
                >
                  <MessageSquarePlus className="h-4 w-4 mr-2 " />
                  Start New Chat
                </Button>
              </DialogTrigger>
              <CreateChatroom
                onClose={() => setShowCreateForm(false)}
                onSuccess={(id) => {
                  setShowCreateForm(false);
                  toast.success("Chatroom created successfully");
                  handleCreateChat(id);
                }}
              />
            </Dialog>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
