"use client";

import { useChatStore } from "../../store/chatStore";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { useDebounce } from "../../hooks/useDebounce";
import { useEffect, useState } from "react";

export const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { setSearchQuery } = useChatStore();

  useEffect(() => {
    setSearchQuery(debouncedSearchTerm);
  }, [debouncedSearchTerm, setSearchQuery]);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
      <Input
        placeholder="Search for chats..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-12 rounded-full h-10 text-md"
      />
    </div>
  );
};
