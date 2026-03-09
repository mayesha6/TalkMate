import mongoose, { Schema } from "mongoose";
import { IConversation } from "./conversation.interface";

const ConversationSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String },
}, { timestamps: true });

export const Conversation = mongoose.model<IConversation>("Conversation", ConversationSchema);

