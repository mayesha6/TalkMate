import express from "express";
import { MessageControllers } from "./message.controller";
import { createMessageSchema } from "./message.validation";
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

export const MessageRoutes = router;