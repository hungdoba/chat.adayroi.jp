import { AIMode } from '@/types/common';

export async function sendUserContent(mode: AIMode, content: string) {
  const apiUrl =
    mode === AIMode.FIX
      ? 'api/fix'
      : mode === AIMode.PROMPT
      ? 'api/prompt'
      : 'api/translate';

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending user content:', error);
    throw error;
  }
}
