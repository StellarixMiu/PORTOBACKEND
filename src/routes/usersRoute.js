import express from 'express'
import { updateUser, getUser } from '../controller/usersController.js'
import { verifyToken } from '../controller/verifyToken.js'
import { refreshToken } from  '../controller/refreshToken.js'

const router = express.Router()

//update user
router.put('/:id', verifyToken, updateUser)

//get user
router.get('/', verifyToken, getUser)

//refresh user token
router.get('/token', refreshToken)

export default router