import jwt from 'jsonwebtoken'
import { createError } from '../controller/errorHandling.js'

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token
  if(!token) return next(createError(401, "You are not authenticated!"))

  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if(err) return next(createError(403, "Your token is invalid!"))
    req.user = user
    next()
  })
}