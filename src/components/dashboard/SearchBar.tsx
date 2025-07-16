'use client';

import { useChatStore } from '../../store/chatStore';
import { Input } from '../ui/input';
import { Search } from 'lucide-react';
import { useDebounce } from '../../hooks/useDebounce';
import { useEffect, useState } from 'react';

export const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { setSearchQuery } = useChatStore();

  useEffect(() => {
    setSearchQuery(debouncedSearchTerm);
  }, [debouncedSearchTerm, setSearchQuery]);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        placeholder="Search chatrooms..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10"
      />
    </div>
  );
};