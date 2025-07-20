import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('GEMINI_API_KEY environment variable is required.');
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(request: Request) {
  try {
    const { content } = await request.json();

    const prompt = `
  You are an expert translator between Japanese and Vietnamese.
  Translate the following content to Vietnamese if it's in Japanese, 
  or to Japanese if it's in Vietnamese.

  Response format:
  \`\`\`json
  [
    {
    "role": "assistant if input is Japanese, user otherwise",
    "option": 1,
    "content": "Original text",
    "note": "Translation"
    }
  ]
  \`\`\`

  Example:
  Input: "こんにちは"
  Output:
  \`\`\`json
  [
    {
    "role": "assistant",
    "option": 1,
    "content": "こんにちは",
    "note": "Xin chào."
    }
  ]
  \`\`\`

  Translate:
  ${content}`;

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
    });

    const result = await model.generateContent(prompt);
    return NextResponse.json({
      response: result.response.text(),
    });
  } catch (error: unknown) {
    console.error(
      'Error generating content:',
      error instanceof Error ? error.message : error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred.',
      },
      { status: 500 }
    );
  }
}
