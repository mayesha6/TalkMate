import { IConversation } from "./conversation.interface";
import { Conversation } from "./conversation.model";


const createConversation = async (userId: string, data: Partial<IConversation>) => {
  const conversation = await Conversation.create({ userId, ...data });
  return conversation;
};

const getUserConversations = async (userId: string) => {
  return Conversation.find({ userId }).sort({ createdAt: -1 });
};

const getConversationById = async (id: string) => {
  return Conversation.findById(id);
};

const updateConversation = async (id: string, data: Partial<IConversation>) => {
  return Conversation.findByIdAndUpdate(id, data, { new: true });
};

const deleteConversation = async (id: string) => {
  return Conversation.findByIdAndDelete(id);
};

export const UserServices = {
  createConversation,
  getUserConversations,
  getConversationById,
  updateConversation,
  deleteConversation,
};