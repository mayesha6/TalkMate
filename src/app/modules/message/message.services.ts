import AppError from "../../errorHelpers/AppError";
import { Message } from "./message.model";
import httpStatus from "http-status-codes";
import { generateAIReply } from "../../utils/aiHelper";

export const createMessage = async (
  payload: Partial<any>,
  files?: Express.MulterS3.File[]
) => {

  let fileUrls: string[] = [];


  if (files && files.length > 0) {

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const result = await Message.aggregate([
      {
        $match: {
          sender: "user",
          $expr: { $eq: [{ $toString: "$userId" }, payload.userId] },
          // userId: payload.userId,
          createdAt: { $gte: startOfDay, $lte: endOfDay },
        },
      },
      {
        $project: {
          // imageCount: { $size: "$fileUrls" },
            imageCount: { $size: { $ifNull: ["$fileUrls", []] } },
        },
      },
      {
        $group: {
          _id: null,
          totalImages: { $sum: "$imageCount" },
        },
      },
    ]);

    const uploadedToday = result[0]?.totalImages || 0;
console.log("result[0]", result)
    if (uploadedToday + files.length > 5) {
      throw new AppError(
        429,
        "You have reached your daily upload limit for images (5 per day)"
      );
    }

    fileUrls = files.map((file) => file.location);
    console.log("uploadedToday:", uploadedToday);
console.log("newFiles:", files?.length);
console.log("payload", payload)
  }

  const message = await Message.create({
    ...payload,
    fileUrls,
  });

  return message;
};

// const createMessage = async (
//   payload: Partial<any>,
//   files?: Express.MulterS3.File[]
// ) => {
//   let fileUrls: string[] = [];

//   if (files && files.length > 0) {
//     const startOfDay = new Date();
//     startOfDay.setHours(0, 0, 0, 0);
//     const endOfDay = new Date();
//     endOfDay.setHours(23, 59, 59, 999);

//     const result = await Message.aggregate([
//       {
//         $match: {
//           sender: "user",
//           $expr: { $eq: [{ $toString: "$userId" }, payload.userId] },
//           createdAt: { $gte: startOfDay, $lte: endOfDay },
//         },
//       },
//       {
//         $project: { imageCount: { $size: { $ifNull: ["$fileUrls", []] } } },
//       },
//       {
//         $group: { _id: null, totalImages: { $sum: "$imageCount" } },
//       },
//     ]);

//     const uploadedToday = result[0]?.totalImages || 0;

//     if (uploadedToday + files.length > 5) {
//       throw new AppError(
//         429,
//         "You have reached your daily upload limit for images (5 per day)"
//       );
//     }

//     fileUrls = files.map((file) => file.location);
//   }

//   // 1️⃣ Save user message
//   const userMessage = await Message.create({
//     ...payload,
//     fileUrls,
//   });

//   // 2️⃣ Generate AI response only if sender is user
//   if (payload.sender === "user") {
//     const aiResponseText = await generateAIReply(payload.content);

//     const aiMessage = await Message.create({
//       conversationId: payload.conversationId,
//       sender: "ai",
//       content: aiResponseText,
//     });

//     return { userMessage, aiMessage };
//   }

//   return { userMessage };
// };

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


export const MessageServices = {
  createMessage,
  getMessagesByConversation,
  updateMessage,
};