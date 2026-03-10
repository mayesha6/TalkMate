import express from "express";
import { conversationIdParamSchema, createConversationSchema, updateConversationSchema } from "./conversation.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { ConversationControllers } from "./conversation.controller";
import { checkAuth } from "../../middlewares/checkAuth";


const router = express.Router();

router.post(
  "/",
  checkAuth("USER", "ADMIN", "SUPER_ADMIN"),
  // validateRequest(createConversationSchema),
  ConversationControllers.createConversation
);

router.get("/", ConversationControllers.getUserConversations);

router.get(
  "/:id",
  validateRequest(conversationIdParamSchema),
  ConversationControllers.getConversationById
);

router.put(
  "/:id",
  validateRequest(updateConversationSchema),
  ConversationControllers.updateConversation
);

router.delete(
  "/:id",
  validateRequest(conversationIdParamSchema),
  ConversationControllers.deleteConversation
)
export const ConversationRoutes = router;