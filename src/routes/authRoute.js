import express from 'express'
import { signinUser } from '../controller/authController.js'

const router = express.Router()

router.post('/signin', signinUser)


export default router