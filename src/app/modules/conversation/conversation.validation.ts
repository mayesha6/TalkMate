import { z } from "zod";

// create conversation
export const createConversationSchema = z.object({
  body: z.object({
    title: z
      .string({
        message: "Title must be a string",
      })
      .optional(),
  }),
});

// update conversation
export const updateConversationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
  }),
});

// params validation
export const conversationIdParamSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Conversation ID is required"),
  }),
});