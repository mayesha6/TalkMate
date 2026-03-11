import OpenAI from "openai";
import { IMessage } from "../message/message.interface";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Generate AI response for chat conversation using OpenAI
 */
export const generateAIResponse = async (
  history: any
): Promise<string> => {
  // Map DB messages to OpenAI ChatCompletionMessageParam type
  const formattedHistory: { role: "user" | "assistant"; content: string }[] =
    history.map(msg => ({
      role: msg.sender === "user" ? "user" : "assistant",
      content: msg.text || "",
    }));

  const completion = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: formattedHistory,
  });

  return completion.choices[0].message.content;
};