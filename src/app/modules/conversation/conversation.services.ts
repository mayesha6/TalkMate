import AppError from "../../errorHelpers/AppError";
import { Message } from "../message/message.model";
import { IConversation } from "./conversation.interface";
import { Conversation } from "./conversation.model";
import httpStatus from "http-status-codes";


const createConversation = async (userId: string, data:any) => {
  const conversation = await Conversation.create({ 
    userId
});
  return conversation;
};

const getUserConversations = async (userId: string) => {
  return Conversation.find({ userId }).sort({ createdAt: -1 });
};

const getConversationById = async (id: string) => {
  const conversation = await Conversation.findById(id);
  if (!conversation) {
    throw new AppError(httpStatus.NOT_FOUND, "Conversation not found");
  }
  return conversation;
};

const updateConversation = async (id: string, data: Partial<IConversation>) => {
  const conversation = await Conversation.findByIdAndUpdate(id, data, { new: true });
   if (!conversation) {
    throw new AppError(httpStatus.NOT_FOUND, "Conversation not found");
  }
  return conversation;
};

const deleteConversation = async (id: string) => {
  const conversation = await Conversation.findByIdAndDelete(id);
   if (!conversation) {
    throw new AppError(httpStatus.NOT_FOUND, "Conversation not found");
  }
  return conversation;
};

const deleteAllConversations = async (userId: string) => {
  // find all conversations of this user
  const conversations = await Conversation.find({ userId }).select("_id");

  const conversationIds = conversations.map((c) => c._id);

  // delete conversations
  await Conversation.deleteMany({ userId });

  // delete messages related to those conversations
  await Message.deleteMany({ conversationId: { $in: conversationIds } });

  return null;
};

export const ConversationServices = {
  createConversation,
  getUserConversations,
  getConversationById,
  updateConversation,
  deleteConversation,
  deleteAllConversations
};