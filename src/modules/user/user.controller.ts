import { RequestHandler } from "express";
import httpStatus from "http-status";
import prisma from "../../shared/prisma";
import emailPasswordChecker from "../../shared/emailPasswordChecker";
import jwt, { Secret } from "jsonwebtoken";
import envConfig from "../../envConfig/index";
import sendResponse from "../../shared/sendResponse";
import { User } from "@prisma/client";

export const createUser: RequestHandler = async (req, res, next) => {
  const data = req.body;
  try {
    const result = await prisma.user.create({
      data,
    });
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: 200,
      message: "user create successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const loginUser: RequestHandler = async (req, res, next) => {
  try {
    const user = req.body;
    const existUser = await emailPasswordChecker(user);
    const token = jwt.sign(
      {
        role: existUser.role,
        userId: existUser.id,
      },
      envConfig.jwt_secret as Secret,
      {
        expiresIn: "365d",
      }
    );

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: 200,
      message: "user login successful",
      token: token,
    });
  } catch (error) {
    next(error);
  }
};
export const getUser: RequestHandler = async (req, res, next) => {
  try {
    const result = await prisma.user.findMany()

    sendResponse<User[]>(res,{
      success:true,
      message:"user get successful",
      statusCode:httpStatus.OK,
      data:result
    })

  } catch (error) {
    next(error);
  }
};

export const getSingleUser: RequestHandler = async (req, res, next) => {
  try {
    const result = await prisma.user.findUnique({
      where:{id:req.params.id}
    })

    sendResponse(res,{
      success:true,
      message:"user get successful",
      statusCode:httpStatus.OK,
      data:result
    })

  } catch (error) {
    next(error);
  }
};
export const updateUser: RequestHandler = async (req, res, next) => {
  try {
    const result = await prisma.user.update({
      where:{id:req.params.id},
      data:req.body
    })

    sendResponse(res,{
      success:true,
      message:"user update successful",
      statusCode:httpStatus.OK,
      data:result
    })

  } catch (error) {
    next(error);
  }
};
export const deleteUser: RequestHandler = async (req, res, next) => {
  try {
    const result = await prisma.user.delete({
      where:{id:req.params.id},
    })

    sendResponse(res,{
      success:true,
      message:"user delete successful",
      statusCode:httpStatus.OK,
      data:result
    })

  } catch (error) {
    next(error);
  }
};

