import AppError from "../../errorHelpers/AppError";
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

export const ConversationServices = {
  createConversation,
  getUserConversations,
  getConversationById,
  updateConversation,
  deleteConversation,
};