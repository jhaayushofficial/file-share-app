import express from "express";
import cors from "cors";
import router from "./routes/routes.js";
import DBconnection from "./database/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const allowedOrigin = "https://file-share-app-sandy.vercel.app";
app.use(cors({ origin: allowedOrigin }));

app.use("/", router);
DBconnection();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
