import express from 'express'
import { updateUser } from '../controller/usersController.js'
import { verifyToken } from '../controller/verifyToken.js'

const router = express.Router()

//update user
router.put('/:id', verifyToken, updateUser)

export default router