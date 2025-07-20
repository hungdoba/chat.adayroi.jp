import { Message, MessageRole } from '@/types/common';
import { useState, useEffect, useRef } from 'react';

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isDeleteMessage, setIsDeleteMessage] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const addUserMessage = (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      role: MessageRole.USER,
      option: 0,
      content: '',
      note: content,
    };

    setMessages((prev) => [...prev, userMessage]);
    return userMessage;
  };

  const deleteMessage = (index: number) => {
    setIsDeleteMessage(true);
    setMessages((prev) => prev.filter((_, i) => i !== index));
  };

  const addAssistantMessages = (newMessages: Message[]) => {
    setMessages((prev) => [...prev, ...newMessages]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  // Effect for scrolling to bottom when messages change
  useEffect(() => {
    if (isDeleteMessage) {
      setIsDeleteMessage(false);
      return;
    }

    if (chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, [messages, isDeleteMessage]);

  return {
    messages,
    addUserMessage,
    deleteMessage,
    addAssistantMessages,
    clearMessages,
    isDeleteMessage,
    chatContainerRef,
  };
}
