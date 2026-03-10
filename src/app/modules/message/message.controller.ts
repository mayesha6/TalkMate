import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { MessageServices } from "./message.services";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

const createMessage = catchAsync(async (req: Request, res: Response) => {
  const result = await MessageServices.createMessage(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Message sent successfully",
    data: result,
  });
});

const getMessagesByConversation = catchAsync(
  async (req: Request, res: Response) => {
    const { conversationId } = req.params;

    const result =
      await MessageServices.getMessagesByConversation(conversationId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Messages retrieved successfully",
      data: result,
    });
  }
);

export const MessageControllers = {
  createMessage,
  getMessagesByConversation,
};