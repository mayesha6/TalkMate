import express from "express";
import { conversationIdParamSchema, createConversationSchema, updateConversationSchema } from "./conversation.validation";
import { validateRequest } from "../../middlewares/validateRequest";


const router = express.Router();

router.post(
  "/",
  validateRequest(createConversationSchema),
  conversationController.createConversationHandler
);

router.get("/", conversationController.getUserConversationsHandler);

router.get(
  "/:id",
  validateRequest(conversationIdParamSchema),
  conversationController.getConversationByIdHandler
);

router.put(
  "/:id",
  validateRequest(updateConversationSchema),
  conversationController.updateConversationHandler
);

router.delete(
  "/:id",
  validateRequest(conversationIdParamSchema),
  conversationController.deleteConversationHandler
);

export default router;