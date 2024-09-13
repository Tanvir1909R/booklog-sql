import httpStatus from "http-status";
import ApiError from "../error/apiError";
import prisma from "./prisma";
import { User } from "@prisma/client";

type iUser = {
  email: string;
  password: string;
};

const emailPasswordChecker = async (user: iUser):Promise<User> => {
  const { email, password } = user;
  const isExist = await prisma.user.findFirst({
    where: { email },
  });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not Found");
  }
  if (isExist.password !== password) {
    throw new ApiError(httpStatus.FORBIDDEN, "password not match");
  }
  return isExist
};

export default emailPasswordChecker;
