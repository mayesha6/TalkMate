import express from "express";
import { MessageControllers } from "./message.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { checkAuth } from "../../middlewares/checkAuth";
import { upload } from "../../config/S3Client.config";
import { createMessage, updateMessage } from "./message.validation";

const router = express.Router();

router.post(
  "/:conversationId",
  checkAuth("USER"),
  upload({
    folder: "MessageImages",
    fileType: "any",
    maxCount: 6,
  }),
  // validateRequest(createMessage),
  MessageControllers.createMessage
);

router.get(
  "/:conversationId",
  MessageControllers.getMessagesByConversation
);

router.patch(
  "/:id",
  validateRequest(updateMessage),
  MessageControllers.updateMessage
);

export const MessageRoutes = router;