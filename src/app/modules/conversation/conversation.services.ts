import { IConversation } from "./conversation.interface";
import { Conversation } from "./conversation.model";


export const createConversation = async (userId: string, data: Partial<IConversation>) => {
  const conversation = await Conversation.create({ userId, ...data });
  return conversation;
};

export const getUserConversations = async (userId: string) => {
  return Conversation.find({ userId }).sort({ createdAt: -1 });
};

export const getConversationById = async (id: string) => {
  return Conversation.findById(id);
};

export const updateConversation = async (id: string, data: Partial<IConversation>) => {
  return Conversation.findByIdAndUpdate(id, data, { new: true });
};

export const deleteConversation = async (id: string) => {
  return Conversation.findByIdAndDelete(id);
};