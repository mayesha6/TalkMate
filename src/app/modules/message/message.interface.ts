import { Types } from "mongoose";

export interface IMessage {
  _id?: Types.ObjectId;
  conversationId: Types.ObjectId;
  sender: "user" | "ai";
  content: string;
  tokensUsed?: number;
  model?: string;
  createdAt?: Date;
  updatedAt?: Date;
}