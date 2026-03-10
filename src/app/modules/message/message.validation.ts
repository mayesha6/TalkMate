import { z } from "zod";

export const createMessageSchema = z.object({
  content: z.string({
    message: "Message content is required",
  }),
});


export const updateMessageSchema = z.object({
  content: z
    .string({
      message: "Message content is required",
    })
    .min(1, "Message cannot be empty"),
});