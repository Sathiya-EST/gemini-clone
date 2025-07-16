'use client';

import { useState } from 'react';
import { Message as MessageType } from '../../types';
import { formatTimestamp, copyToClipboard } from '../../lib/utils';
import { Button } from '../ui/button';
import { Copy, Check } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface MessageProps {
  message: MessageType;
}

export const MessageComponent: React.FC<MessageProps> = ({ message }) => {
  const [showCopy, setShowCopy] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(message.content);
    if (success) {
      setCopied(true);
      toast.success('Message copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error('Failed to copy message');
    }
  };

  const isUser = message.sender === 'user';

  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
      onMouseEnter={() => setShowCopy(true)}
      onMouseLeave={() => setShowCopy(false)}
    >
      <div
        className={`max-w-[70%] rounded-lg p-3 relative group ${
          isUser
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
        }`}
      >
        {message.image && (
          <div className="mb-2">
            <img
              src={message.image}
              alt="Uploaded"
              className="max-w-full h-auto rounded-md"
            />
          </div>
        )}
        
        <p className="text-sm">{message.content}</p>
        
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs opacity-70">
            {formatTimestamp(message.timestamp)}
          </span>
          
          {showCopy && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};