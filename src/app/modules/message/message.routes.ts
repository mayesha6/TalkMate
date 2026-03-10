import express from "express";
import { MessageControllers } from "./message.controller";
import { createMessageSchema, updateMessageSchema } from "./message.validation";
import { validateRequest } from "../../middlewares/validateRequest";

const router = express.Router();

router.post(
  "/",
  validateRequest(createMessageSchema),
  MessageControllers.createMessage
);

router.get(
  "/:conversationId",
  MessageControllers.getMessagesByConversation
);

router.patch(
  "/:id",
  validateRequest(updateMessageSchema),
  MessageControllers.updateMessage
);

export const MessageRoutes = router;