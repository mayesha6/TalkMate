import express from "express";
import { FileControllers } from "./fileUp.controller";

const router = express.Router();

router.post("/upload-url", FileControllers.getUploadUrl);
router.post("/save", FileControllers.saveFile);
router.delete("/:key", FileControllers.deleteFile);

export const fileRoutes = router;