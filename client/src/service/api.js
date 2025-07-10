import axios from "axios";
const API_URL = "http://localhost:8000";

export const uploadFile = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/upload`, data);
    return response.data;
  } catch (error) {
    console.log("Error while calling the api", error.message);
  }
};

export const getFileInfo = async (fileId) => {
  try {
    const response = await axios.get(`${API_URL}/file-info/${fileId}`);
    return response.data;
  } catch (error) {
    console.log("Error while fetching file info", error.message);
  }
};
