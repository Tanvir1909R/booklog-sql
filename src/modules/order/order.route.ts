import {Router} from 'express'
import validateRequest from '../../middleware/validateRequest'
import authCheck from '../../middleware/authCheck'
import {USER_ROLE} from '../../enum/user'
import { createOrder } from './order.controller'
import { orderZodSchema } from './order.validation'

const route = Router()

route.post('/create-order',validateRequest(orderZodSchema),authCheck([USER_ROLE.CUSTOMER]),createOrder)
// route.get('/',getBooks)
// route.get('/:categoryId/category',getBooksByCategory)
// route.get('/:id',getSingleBook)
// route.patch('/:id',authCheck([USER_ROLE.ADMIN]),updateBook)
// route.delete('/:id',authCheck([USER_ROLE.ADMIN]),deleteUser)

export const orderRoute = route