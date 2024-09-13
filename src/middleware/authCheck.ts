import { NextFunction, Request, Response } from "express";
import ApiError from "../error/apiError";
import httpStatus from "http-status";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import envConfig from "../envConfig";

const authCheck =
  (userRole: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.FORBIDDEN, "unauthorize access");
      }
      let verifyUser: JwtPayload;
      const user = jwt.verify(token, envConfig.jwt_secret as Secret);

      if (typeof user !== "string") {
        verifyUser = user;
      } else {
        throw new ApiError(httpStatus.NOT_FOUND, "token is not valid");
      }

      if (!userRole.includes(verifyUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, "Your are not authorize");
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default authCheck;
