import express from "express";
import { FileController } from "./fileUp.controller";
import { upload } from "../../config/S3Client.config";
import { FileTypes } from "./fileUp.interface";

const router = express.Router();

router.post(
  "/upload",
  upload({
    folder: "images",
    fileType: FileTypes.IMAGE,
    maxCount: 5,
  }),
  FileController.uploadFiles
);

router.delete("/delete-file", FileController.deleteFile);

export const FileRoutes = router;