import { z } from "zod";

export const createConversationSchema = z.object({
  title: z
      .string({
        message: "Title must be a string",
      })
      .optional(),
});


export const updateConversationSchema = z.object({
  title: z.string().optional(),
});
