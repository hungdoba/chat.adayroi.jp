export enum MessageRole {
  USER = 'user',
  ASSISTANT = 'assistant',
}

export interface Message {
  role: MessageRole;
  option: number;
  content: string;
  note: string;
}

export interface ApiResponse {
  result: string;
  success: boolean;
  error?: string;
}

export enum AIMode {
  TRANSLATE = 'translate',
  FIX = 'fix',
  PROMPT = 'prompt',
}
