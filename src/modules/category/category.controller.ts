import { RequestHandler } from "express";
import httpStatus from "http-status";
import prisma from "../../shared/prisma";
import emailPasswordChecker from "../../shared/emailPasswordChecker";
import jwt, { Secret } from "jsonwebtoken";
import envConfig from "../../envConfig/index";
import sendResponse from "../../shared/sendResponse";
import { Category, User } from "@prisma/client";

export const createCategory: RequestHandler = async (req, res, next) => {
  const data = req.body;
  try {
    const result = await prisma.category.create({
      data,
    });
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: 200,
      message: "category create successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const getCategory: RequestHandler = async (req, res, next) => {
  try {
    const result = await prisma.category.findMany()

    sendResponse<Category[]>(res,{
      success:true,
      message:"category fetch successful",
      statusCode:httpStatus.OK,
      data:result
    })

  } catch (error) {
    next(error);
  }
};

export const getSingleCategory: RequestHandler = async (req, res, next) => {
  try {
    const result = await prisma.category.findUnique({
      where:{id:req.params.id},
      include:{
        books:true
      }
    })

    sendResponse(res,{
      success:true,
      message:"category fetch successful",
      statusCode:httpStatus.OK,
      data:result
    })

  } catch (error) {
    next(error);
  }
};
export const updateCategory: RequestHandler = async (req, res, next) => {
  try {
    const result = await prisma.category.update({
      where:{id:req.params.id},
      data:req.body
    })

    sendResponse(res,{
      success:true,
      message:"category update successful",
      statusCode:httpStatus.OK,
      data:result
    })

  } catch (error) {
    next(error);
  }
};
export const deleteCategory: RequestHandler = async (req, res, next) => {
  try {
    const result = await prisma.category.delete({
      where:{id:req.params.id},
    })

    sendResponse(res,{
      success:true,
      message:"category delete successful",
      statusCode:httpStatus.OK,
      data:result
    })

  } catch (error) {
    next(error);
  }
};

