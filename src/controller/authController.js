import mongoose from "mongoose"
import User from '../models/usersModel.js'
import bcrypt from "bcrypt"
import { createError } from "../controller/errorHandling.js"
import jwt from 'jsonwebtoken'


// export const signupUser = async (req, res, next) => {
//     try {
//         const salt = bcrypt.genSaltSync(10);
//         const enPass = bcrypt.hashSync(req.body.password, salt)
//         const newUser = new User({...req.body, password: enPass}) 
//         await newUser.save()
//         res.status(200).json(newUser)
//     }catch(err) {
//         next(err)
//     }
// }

export const signinUser = async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username})
        if(!user) return next(createError(404, "Username not found!!"))

        const passwordCorrect = await bcrypt.compareSync(req.body.password, user.password)
        
        if(!passwordCorrect) return next(createError(404, "Wrong credentials!"))

        const token = jwt.sign({id: user._id}, process.env.JWT_KEY)

        const {password, ...userData} = user._doc

        const resSend = []

        resSend.push({
            userData,
            token
        })

        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(userData)
    }catch(err) {
        next(err)
    }
}