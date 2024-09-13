import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import authCheck from "../../middleware/authCheck";
import { USER_ROLE } from "../../enum/user";
import { createCategory, deleteCategory, getCategory, getSingleCategory, updateCategory } from "./category.controller";
import { categoryZodSchema } from "./category.validation";
const route = Router();

route.post(
  "/create-category",
  validateRequest(categoryZodSchema),
  authCheck([USER_ROLE.ADMIN]),
  createCategory
);
route.get('/', getCategory)
route.get('/:id',getSingleCategory)
route.patch('/:id',authCheck([USER_ROLE.ADMIN]),updateCategory)
route.delete('/:id',authCheck([USER_ROLE.ADMIN]),deleteCategory)

export const categoryRoute = route;
