import { ErrorRequestHandler } from "express"
import ApiError from "../error/apiError";


const globalErrorHandler:ErrorRequestHandler = (error,req,res,next) => {
  let statusCode = 500;
  let errorMessage = 'something went wrong!'
  if(error instanceof ApiError){
    statusCode = error.statusCode;
    errorMessage = error.message
  }else if(error instanceof Error){
    errorMessage = error.message
  }

  res.status(statusCode).json({
    success:false,
    statusCode,
    errorMessage
  })
}

export default globalErrorHandler