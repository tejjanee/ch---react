import express from "express";
import connectDB from "./database/dbConnection.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import { errorMiddleware } from "./middlewares/error.js";
import messageRouter from "./router/messageRouter.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";


dotenv.config({
  path: './.env'
})



const app=express()
app.get('/', (req, res) => {
  res.send('Welcome!!');
});
app.use(
    cors({
      origin: [process.env.FRONTEND_URL_ONE, process.env.DASHBOARD_URL_TWO],
      method: ["GET", "POST", "DELETE", "PUT"],
      credentials: true,
    })
  );
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
    })
  );
connectDB()
// routes
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);

app.use(errorMiddleware);
export default app;
