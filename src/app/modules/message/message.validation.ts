import { z } from "zod";

export const createMessage = z.object({
  content: z.string({
    message: "Message content is required",
  }),
});


export const updateMessage = z.object({
  content: z
    .string({
      message: "Message content is required",
    })
    .min(1, "Message cannot be empty"),
});