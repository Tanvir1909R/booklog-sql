import express, { Application, Request, Response } from "express";
import cors from "cors";
import httpStatus from "http-status";
import { userRoute } from "./modules/user/user.route";
import cookieParser from 'cookie-parser'
import globalErrorHandler from "./middleware/globalErrorHandler";
import { categoryRoute } from "./modules/category/category.route";
import { bookRoute } from "./modules/books/books.route";
import { orderRoute } from "./modules/order/order.route";

const app:Application = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())



app.use('/api/v1/user',userRoute);
app.use('/api/v1/categories',categoryRoute);
app.use('/api/v1/books',bookRoute);
app.use('/api/v1/orders',orderRoute);


app.use(globalErrorHandler)
app.use((req:Request, res:Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
});

export default app;
