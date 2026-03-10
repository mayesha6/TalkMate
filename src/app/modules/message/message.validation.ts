import { z } from "zod";

export const createMessageSchema = z.object({
  conversationId: z.string({
    message: "Conversation ID is required",
  }),

  sender: z.enum(["user", "ai"]),

  content: z.string({
    message: "Message content is required",
  }),

  tokensUsed: z.number().optional(),

  model: z.string().optional(),
});


export const updateMessageSchema = z.object({
  content: z
    .string({
      message: "Message content is required",
    })
    .min(1, "Message cannot be empty"),
});