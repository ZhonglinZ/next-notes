import { qwen } from '@/lib/qwenClient';
import { streamText, UIMessage, convertToModelMessages } from 'ai';

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: qwen('qwen-turbo'),
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}