export enum FileTypes {
  IMAGE = "image",
  VIDEO = "video",
  AUDIO = "audio",
  PDF = "pdf",
}

export interface IFileUpload {
  _id?: string;
  userId: string;
  conversationId?: string;
  messageId?: string;
  fileType: FileTypes;
  fileUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}