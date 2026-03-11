import mongoose, { Schema } from "mongoose";
import { IMessage } from "./message.interface";

const MessageSchema = new Schema<IMessage>(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sender: {
      type: String,
      enum: ["user", "ai"],
      required: true,
    },
    content: {
      type: String,
    },
    fileUrls: [{
      type: String,
    }],
    tokensUsed: {
      type: Number,
    },
    model: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Message = mongoose.model<IMessage>("Message", MessageSchema);