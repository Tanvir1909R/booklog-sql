import {Router} from 'express'
import validateRequest from '../../middleware/validateRequest'
import { bookZodSchema } from './books.validation'
import authCheck from '../../middleware/authCheck'
import {USER_ROLE} from '../../enum/user'
import { createBooks, getBooks, getBooksByCategory, getSingleBook, updateBook,deleteUser } from './books.controller'

const route = Router()

route.post('/create-book',validateRequest(bookZodSchema),authCheck([USER_ROLE.ADMIN]),createBooks)
route.get('/',getBooks)
route.get('/:categoryId/category',getBooksByCategory)
route.get('/:id',getSingleBook)
route.patch('/:id',authCheck([USER_ROLE.ADMIN]),updateBook)
route.delete('/:id',authCheck([USER_ROLE.ADMIN]),deleteUser)

export const bookRoute = route