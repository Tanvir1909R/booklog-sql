import { RequestHandler } from "express";
import httpStatus from "http-status";
import prisma from "../../shared/prisma";
import sendResponse from "../../shared/sendResponse";
import pick from "../../shared/pick";
import { Prisma } from "@prisma/client";
import paginationHelper from "../../shared/paginationHelper";


type iDirectFilter = {
  maxPrice?:string | number
  minPrice?:string | number
}

export const createOrder: RequestHandler = async (req, res, next) => {
  const data = req.body;
  try {
    // const result = await prisma.order.create({
    //   data,
    // });
    res.status(httpStatus.OK).json({
      success: true,
      statusCode: 200,
      message: "order create successful",
      // data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const getBooks: RequestHandler = async (req, res, next) => {
  try {
    const query = req.query;
    const filter = pick(query, ["search", "minPrice", "maxPrice"]);
    const options = pick(query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const { search, ...otherFilter } = filter;
    const {limit,page,skip,sortBy,sortOrder} = paginationHelper(options)
    const andCondition: any[] = [];
    const directFilter:iDirectFilter = otherFilter
    if (search) {
      andCondition.push({
        OR: ["genre", "title", "author"].map((field: string) => ({
          [field]: {
            contains: search,
            mode: "insensitive",
          },
        })),
      });
    }
    if(Object.keys(directFilter).length === 1 && directFilter.maxPrice){
      const priceNumber = +directFilter.maxPrice
      andCondition.push({
        price:{lt:priceNumber}
      })
    }
    if(Object.keys(directFilter).length === 1 && directFilter.minPrice){
      const priceNumber = +directFilter.minPrice
      andCondition.push({
        price:{gt:priceNumber}
      })
    }
    if(Object.keys(directFilter).length === 2){
      const minPrice = +directFilter.minPrice!
      const maxPrice = +directFilter.maxPrice!
      andCondition.push({
        price:{
          lt:maxPrice,
          gt:minPrice
        }
      })
    }

    const whereCondition: Prisma.BookWhereInput =
      andCondition.length > 0 ? { AND: andCondition } : {};
    const result = await prisma.book.findMany({
      where: whereCondition,
      skip,
      take:limit,
      orderBy: options.sortOrder && options.sortBy ?
      {
        [sortBy]:sortOrder
      } :
      {
        price:'desc'
      }
                  
                  
    });
    const total = await prisma.book.count()
    const totalPage = Math.ceil(total / limit)
    sendResponse(res, {
      success: true,
      message: "books fetch successful",
      statusCode: httpStatus.OK,
      data: result,
      meta:{
        page:page,
        size:limit,
        total,
        totalPage
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getBooksByCategory: RequestHandler = async (req, res, next) => {
  try {
  const categoryId = req.params.categoryId;
  console.log(categoryId);
  
    const result = await prisma.book.findMany({
      where: {
        categoryId:categoryId
      },
      include:{category:true}
    });

    sendResponse(res, {
      success: true,
      message: "Books with associated category data fetched successfully",
      statusCode: httpStatus.OK,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}; 

export const getSingleBook: RequestHandler = async (req, res, next) => {
  try {
    const result = await prisma.book.findUnique({
      where: { id: req.params.id },
    });

    sendResponse(res, {
      success: true,
      message: "book get successful",
      statusCode: httpStatus.OK,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const updateBook: RequestHandler = async (req, res, next) => {
  try {
    const result = await prisma.book.update({
      where: { id: req.params.id },
      data: req.body,
    });

    sendResponse(res, {
      success: true,
      message: "book update successful",
      statusCode: httpStatus.OK,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteUser: RequestHandler = async (req, res, next) => {
  try {
    const result = await prisma.book.delete({
      where: { id: req.params.id },
    });

    sendResponse(res, {
      success: true,
      message: "book delete successful",
      statusCode: httpStatus.OK,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};