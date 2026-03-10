import AppError from "../../errorHelpers/AppError";
import { Message } from "./message.model";
import httpStatus from "http-status-codes";

const createMessage = async (payload: any) => {
  const message = await Message.create(payload);
  return message;
};

const getMessagesByConversation = async (conversationId: string) => {
  const messages = await Message.find({ conversationId })
    .sort({ createdAt: 1 });

  return messages;
};

const updateMessage = async (id: string, content: string) => {
  const message = await Message.findById(id);

  if (!message) {
    throw new AppError(httpStatus.NOT_FOUND, "Message not found");
  }

  // best practice
  if (message.sender === "ai") {
    throw new AppError(httpStatus.BAD_REQUEST, "AI message cannot be edited");
  }

  message.content = content;
  await message.save();

  return message;
};

const deleteMessage = async (id: string) => {
  const message = await Message.findById(id);

  if (!message) {
    throw new AppError(httpStatus.NOT_FOUND, "Message not found");
  }

  await Message.findByIdAndDelete(id);

  return null;
};

export const MessageServices = {
  createMessage,
  getMessagesByConversation,
  updateMessage,
  deleteMessage,
};