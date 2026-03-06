import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { sendResponse } from "../../utils/sendResponse";
import { validateFileType } from "./fileUp.validation";
import { deleteFileFromS3, generateUploadUrl } from "../../config/S3Client.config";
import { saveFileInfo } from "./fileUp.services";

export const getUploadUrl = async (req: Request, res: Response) => {
    const { fileName, fileType, category } = req.body;

    validateFileType(fileType, category);

    const folder = category;

    const data = await generateUploadUrl(fileName, fileType, folder);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "File uploaded successfully.",
        data: data
    });
};

export const saveFile = async (req: Request, res: Response) => {
    const { key, size, type } = req.body;

    const file = await saveFileInfo(key, size, type);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "File saved successfully.",
        data: file
    });
};

export const deleteFile = async (req: Request, res: Response) => {
    const { key } = req.params;

    await deleteFileFromS3(key);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "File deleted successfully.",
        data: null
    });
};