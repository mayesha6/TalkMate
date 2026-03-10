import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { ConversationServices } from "./conversation.services";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";

const createConversation = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;
    const user = req.user as JwtPayload;
    console.log(user)
    const result = await ConversationServices.createConversation(
      user.userId,
      payload
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Conversation Created Successfully",
      data: result,
    });
  }
);

const getUserConversations = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as JwtPayload;

    const result = await ConversationServices.getUserConversations(user.userId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Conversations Retrieved Successfully",
      data: result,
    });
  }
);

const getConversationById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const conversationId = req.params.id;

    const result =
      await ConversationServices.getConversationById(conversationId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Conversation Retrieved Successfully",
      data: result,
    });
  }
);

const updateConversation = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
  const conversation = await ConversationServices.updateConversation(req.params.id, req.body);
   sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Conversation Retrieved Successfully",
      data: conversation,
    });
});

const deleteConversation = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
  await ConversationServices.deleteConversation(req.params.id);
  sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Conversation deleted Successfully",
      data: null,
    });
});

export const ConversationControllers = {
  createConversation,
  getUserConversations,
  getConversationById,
  updateConversation,
  deleteConversation,
};