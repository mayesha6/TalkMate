export enum MessageSender {
  USER = "USER",
  BOT = "BOT",
}

export interface IMessage {
  _id?: string;
  conversationId: string;
  sender: MessageSender;
  content: string;
  fileId?: string; 
  createdAt?: Date;
  updatedAt?: Date;
}