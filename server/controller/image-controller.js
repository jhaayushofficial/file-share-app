import File from "../models/file.js";
import dotenv from "dotenv";

dotenv.config();

export const uploadImage = async (req, res) => {
  const fileObj = {
    path: req.file.path,
    name: req.file.originalname,
  };

  try {
    const file = await File.create(fileObj);
    res.status(200).json({
      msg: "File uploaded succesfully",
      path: `http://localhost:8000/file/${file._id}`,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getImage = async (req, res) => {
  try {
    const fileID = req.params.fileId;
    const file = await File.findById(fileID);

    if (!file) {
      return res.status(404).json({ msg: "File not found" });
    }

    // Increment download count before sending the file
    file.downloadCount++;
    await file.save();

    // Send the file for download
    res.download(file.path, file.name);
  } catch (error) {
    console.error(error.message);
    // Only send error if headers not already sent
    if (!res.headersSent) {
      res
        .status(500)
        .json({ msg: "Error downloading file", error: error.message });
    }
  }
};

export const getFileInfo = async (req, res) => {
  try {
    const fileID = req.params.fileId;
    const file = await File.findById(fileID);
    if (!file) {
      return res.status(404).json({ msg: "File not found" });
    }
    res.status(200).json({
      name: file.name,
      downloadCount: file.downloadCount,
      id: file._id,
      path: file.path,
    });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error fetching file info", error: error.message });
  }
};
