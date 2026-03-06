import { FileTypes } from "./fileUp.interface";

const mimeMap: Record<FileTypes, string[]> = {
  image: ["image/jpeg", "image/png", "image/webp"],
  video: ["video/mp4", "video/mpeg"],
  audio: ["audio/mpeg", "audio/mp3"],
  pdf: ["application/pdf"],
};

export const validateFileType = (fileType: string, category: FileTypes) => {
  if (!mimeMap[category].includes(fileType)) {
    throw new Error(`Invalid ${category} file type`);
  }
};