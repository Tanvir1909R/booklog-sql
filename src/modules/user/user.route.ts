import {Router} from 'express'
import { createUser, deleteUser, getSingleUser, getUser, loginUser, updateUser } from './user.controller'
import validateRequest from '../../middleware/validateRequest'
import { userLoginZodSchema, userZodSchema } from './user.validation'
import authCheck from '../../middleware/authCheck'
import {USER_ROLE} from '../../enum/user'
const route = Router()

route.post('/signup',validateRequest(userZodSchema),createUser)
route.post('/login',validateRequest(userLoginZodSchema),loginUser)
route.get('/',authCheck([USER_ROLE.ADMIN]),getUser)
route.get('/:id',authCheck([USER_ROLE.ADMIN]),getSingleUser)
route.patch('/:id',authCheck([USER_ROLE.ADMIN]),updateUser)
route.delete('/:id',authCheck([USER_ROLE.ADMIN]),deleteUser)

export const userRoute = route