import { Types } from "mongoose";

export interface IMessage {
  _id?: Types.ObjectId;
  conversationId: Types.ObjectId;
  userId: Types.ObjectId;
  sender: "user" | "ai";
  content?: string;
  fileUrls?: string[]; 
  tokensUsed?: number;
  model?: string;
  createdAt?: Date;
  updatedAt?: Date;
}