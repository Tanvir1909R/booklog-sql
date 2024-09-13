import { PrismaPromise } from "@prisma/client";
import { Response } from "express";

type iResponse<T> = {
    success:boolean,
    statusCode:number,
    message:string,
    data?:T
    meta?:{
        size:number
        page:number
        total:number | PrismaPromise<number>
        totalPage:number
    }
}

const sendResponse = <T>(res:Response,data:iResponse<T>):void =>{
    const responseData = {
        success:data.success,
        statusCode:data.statusCode,
        message:data.message,
        data:data.data || undefined,
        meta:data.meta || undefined
    }

    res.status(data.statusCode).json(responseData)
}

export default sendResponse