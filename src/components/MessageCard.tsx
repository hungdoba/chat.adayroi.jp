import { cn } from '@/lib/utils';
import { Message, MessageRole } from '@/types/common';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';
import { X } from 'lucide-react';

export const MessageCard = ({
  message,
  onDelete,
  index,
}: {
  message: Message;
  onDelete: (index: number) => void;
  index: number;
}) => (
  <div
    className={cn(
      'mb-1 w-full md:w-4/5 cursor-pointer flex',
      message.role === MessageRole.USER ? 'self-start' : 'self-end'
    )}
  >
    <X
      className={cn(
        'w-6 h-6',
        message.role === MessageRole.USER
          ? 'order-first mr-2'
          : 'order-last ml-2'
      )}
      onClick={() => onDelete(index)}
    />
    <Card className="w-full">
      <CardHeader>
        <CardTitle
          onClick={() => {
            if (navigator && navigator.clipboard) {
              navigator.clipboard.writeText(message.content);
            } else {
              console.warn('Clipboard API not available');
            }
          }}
        >
          {message.content}
        </CardTitle>
        <CardDescription
          onClick={() => {
            if (navigator && navigator.clipboard) {
              navigator.clipboard.writeText(message.note);
            } else {
              console.warn('Clipboard API not available');
            }
          }}
          className="cursor-pointer hover:opacity-75 whitespace-pre-line text-xs"
        >
          {message.note}
        </CardDescription>
      </CardHeader>
    </Card>
  </div>
);
