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
        const user = await User.findOne({email: req.body.email})
        if(!user) return next(createError(404, "Email not found!!"))

        const passwordCorrect = await bcrypt.compareSync(req.body.password, user.password)
        
        if(!passwordCorrect) return next(createError(404, "Wrong credentials!"))

        const accessToken = jwt.sign({id: user._id}, process.env.JWT_ACCESS_KEY,{
            expiresIn: '30s'
        })
        const refreshToken = jwt.sign({id: user._id}, process.env.JWT_REFRESH_KEY,{
            expiresIn: '1d'
        })
        await User.findByIdAndUpdate(
            user._id,
            {
            $set : {
                refresh_token: refreshToken
            }
            },
            { $new:true }
        )
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            // secure: true
        }).status(200).json(accessToken)
    }catch(err) {
        next(err)
    }
}

export const signOutUser = async (req, res) => {

    const refreshTokenCookie = req.cookies.refreshToken
    if(!refreshTokenCookie) return res.status(204)

    const user = await User.findOne({
        refresh_token: refreshTokenCookie
    })
    if(!user) return res.status(204)

    await User.findByIdAndUpdate(
        user._id,
        {
        $set : {
            refresh_token: null
        }
        },
        { $new:true }
    )
    res.clearCookie("refreshToken")
    return res.status(200).json("Successful Sign Out")
}