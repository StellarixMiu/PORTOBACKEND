import express from 'express'
import { signinUser, signOutUser } from '../controller/authController.js'

const router = express.Router()

router.post('/signin', signinUser)

router.delete('/signout', signOutUser)


export default router