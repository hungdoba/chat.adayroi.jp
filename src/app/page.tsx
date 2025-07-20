'use client';
import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { SelectMode } from '@/components/SelectMode';
import { useMessages } from '@/hooks/useMessages';
import { AIMode, Message } from '@/types/common';
import { MessageCard } from '@/components/MessageCard';
import { sendUserContent } from '@/services/api';
import { ListX } from 'lucide-react';

export default function Home() {
  const {
    messages,
    addUserMessage,
    deleteMessage,
    addAssistantMessages,
    clearMessages,
    chatContainerRef,
  } = useMessages();

  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const [selectedMode, setSelectedMode] = useState<AIMode>(AIMode.TRANSLATE);

  // Handlers
  const handleInputChange = (value: string) => {
    setContent(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!content.trim()) {
      setLoading(false);
      return;
    }

    if (selectedMode !== AIMode.TRANSLATE) {
      // Add user message using the hook
      addUserMessage(content);
    }

    try {
      // Use the API service instead of direct fetch
      const data = await sendUserContent(selectedMode, content);

      console.log(data);

      const jsonString = data.response.match(/```json\n([\s\S]*?)\n```/)?.[1];
      if (!jsonString) throw new Error('Failed to parse JSON from response');

      console.log(jsonString);

      let parsedResult: Message[] = [];
      try {
        parsedResult = JSON.parse(jsonString);
        if (!Array.isArray(parsedResult)) {
          throw new Error('Response is not an array');
        }
      } catch (parseError) {
        console.error('Failed to parse JSON:', parseError);
        throw new Error('Invalid response format');
      }

      // Add assistant messages using the hook
      addAssistantMessages(parsedResult);
      setContent('');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center max-h-screen m-2">
      <div className="flex flex-col w-full">
        <ScrollArea className="h-[calc(80vh-8rem)] p-1 mb-2">
          <div ref={chatContainerRef} className="flex flex-col w-full">
            {messages.map((message, index) => (
              <MessageCard
                key={index}
                message={message}
                onDelete={deleteMessage}
                index={index}
              />
            ))}
          </div>
        </ScrollArea>

        <form onSubmit={handleSubmit} className="flex-none flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <SelectMode
              onChange={(value: AIMode) => setSelectedMode(value)}
              defaultValue={AIMode.TRANSLATE}
            />
            <div className="flex items-center gap-2 justify-start hover:cursor-pointer">
              <ListX onClick={clearMessages} />
            </div>
          </div>
          <Textarea
            className="mb-2"
            value={content}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={
              selectedMode === AIMode.TRANSLATE
                ? 'Type your message that you want to translate. Japanese to Vietnamese and vice versa.'
                : selectedMode === AIMode.PROMPT
                ? 'Type your prompt to optimize.'
                : 'Type your message that you want to optimize in Japanese.'
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.ctrlKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <div className="pb-[env(safe-area-inset-bottom)]">
            <Button disabled={loading}>
              {loading
                ? 'Loading...'
                : selectedMode === AIMode.TRANSLATE
                ? 'Translate message'
                : selectedMode === AIMode.PROMPT
                ? 'Optimize prompt'
                : 'Optimize sentence'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
