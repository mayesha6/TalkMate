import express from "express";
import { updateConversationSchema } from "./conversation.validation";
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

router.get("/", checkAuth("USER", "ADMIN", "SUPER_ADMIN"), ConversationControllers.getUserConversations);

router.get(
  "/:id",
  ConversationControllers.getConversationById
);

router.patch(
  "/:id",
  validateRequest(updateConversationSchema),
  ConversationControllers.updateConversation
);

router.delete(
  "/:id",
  ConversationControllers.deleteConversation
)

router.delete(
  "/",
  checkAuth("USER", "ADMIN", "SUPER_ADMIN"),
  ConversationControllers.deleteAllConversations
)
export const ConversationRoutes = router;