import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/user";
import authRoutes from "./routes/auth";
import myHotelRoutes from "./routes/my-hotels";
import cookieParser from "cookie-parser";
import path from "path";
import { v2 as cloudinary } from "cloudinary";


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

mongoose
  .connect(process.env.MONGODB_CONNNECTION_STRING as string)
  .then(() => {
    console.log("Connected to the MongoDB Perfectly");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();
app.use(cookieParser());
//it help to convert the body of a api request into JSON authomatically
app.use(express.json());
//it help to pass the url
app.use(express.urlencoded({ extended: true }));
//it help to prevent the request url security from the backend
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

//deployment
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

//routers
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/my-hotels", myHotelRoutes);

//for all request to go to the exact route
app.get("*", (req:Request, res:Response) => {
  res.sendFile(path.join(__dirname, "../..frontend/dist/index.html"))
})

//
app.listen(3500, () => {
  console.log("Server listening to localhost: 3500 correctly ");
});
