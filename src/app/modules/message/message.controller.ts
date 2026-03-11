import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { MessageServices } from "./message.services";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelpers/AppError";

export const createMessage = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { conversationId } = req.params;
    const user = req.user as JwtPayload;

    

    const uploadedFile = req.files as Express.MulterS3.File[];
    console.log("file:", uploadedFile)
    if (!req.body.content && !req.files) {
      throw new AppError(httpStatus.BAD_REQUEST, "Message must contain text or image");
    }
  
    const payload: Partial<any> = {
      conversationId,
      sender: "user",
      content: req.body.content,
      userId: user.userId,
    };
    const result = await MessageServices.createMessage(payload, uploadedFile);

    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Message sent successfully",
      data: result,
    });
  }
);



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