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
      You are a senior prompt engineer specializing in optimizing AI prompts for better results. 
      Review the user's prompt and provide improved versions with clear explanations.

      Guidelines:
      - Analyze for clarity, specificity, contextual details, and actionable instructions
      - Provide 2-3 revised versions with progressive improvements
      - Explain specific enhancements made in each revision
      - Preserve the original intent while improving structure and precision

      Response format (JSON array):
      \`\`\`json
      [
      {
        "role": "assistant",
        "option": <number>,
        "content": "<Revised prompt>",  
        "note": "<Specific improvements and reasoning>"
      }
      ]
      \`\`\`

      Example:
      \`\`\`json
      [
      {
        "role": "assistant",
        "option": 1,
        "content": "Analyze this dataset and identify key patterns in user behavior.",
        "note": "Added clear action verb and specific focus area."
      },
      {
        "role": "assistant",
        "option": 2,
        "content": "Analyze this e-commerce dataset from 2023 and identify key patterns in mobile user purchasing behavior. Present findings with 3-5 actionable insights.",
        "note": "Added temporal context, narrowed scope, and specified output format."
      }
      ]
      \`\`\`

      User prompt to improve:
      
      "${content}"
    `;

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
    });

    const result = await model.generateContent(prompt);
    console.log(result.response.text());
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
