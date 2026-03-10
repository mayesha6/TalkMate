import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { MessageServices } from "./message.services";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

const createMessage = catchAsync(async (req: Request, res: Response) => {
  const { conversationId } = req.params;

  const payload = {
    conversationId,
    sender: "user",
    content: req.body.content as string,
  };

  const result = await MessageServices.createMessage(payload);

  sendResponse(res, {
    success: true,
    statusCode: 201,
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

const updateMessage = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { content } = req.body;

  const result = await MessageServices.updateMessage(id, content);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Message updated successfully",
    data: result,
  });
});

export const MessageControllers = {
  createMessage,
  getMessagesByConversation,
  updateMessage,
};