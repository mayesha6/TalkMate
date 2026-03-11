import { Message } from "../modules/message/message.model";

export const checkDailyMediaLimit = async (userId: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayMessages = await Message.find({
    userId,
    createdAt: { $gte: today },
  }).select("images video");

  let imageCount = 0;
  let videoCount = 0;

  todayMessages.forEach(msg => {
    if (msg.images?.length) imageCount += msg.images.length;
    if (msg.video) videoCount += 1;
  });

  return { imageCount, videoCount };
};