export enum FileType {
  PDF = "pdf",
  IMAGE = "image",
  TEXT = "text",
}

export interface IFileUpload {
  _id?: string;
  userId: string;
  conversationId?: string;
  messageId?: string;
  fileType: FileType;
  fileUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}