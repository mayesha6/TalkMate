import { Request, Response } from "express";
import { FileService } from "./fileUp.services";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

const uploadFiles = async (req: Request, res: Response) => {
    const files = req.files as Express.MulterS3.File[];

    if (!files || files.length === 0) {
        return res.status(400).json({
            success: false,
            message: "No files uploaded",
        });
    }

    const result = await FileService.uploadFiles(files);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Email Sent Successfully",
        data: null,
    });
};

const deleteFile = async (req: Request, res: Response) => {
    const { key } = req.body;

    const result = await FileService.deleteFileFromS3(key);

    res.status(200).json({
        success: true,
        message: result.message,
    });
};


export const FileController = {
    uploadFiles,
    deleteFile
};