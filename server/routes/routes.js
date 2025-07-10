import express from "express";
import {
  uploadImage,
  getImage,
  getFileInfo,
} from "../controller/image-controller.js";
import upload from "../utils/upload.js";
const router = express.Router();

router.post("/upload", upload.single("file"), uploadImage);

router.get("/file/:fileId", getImage);
router.get("/file-info/:fileId", getFileInfo);

export default router;
