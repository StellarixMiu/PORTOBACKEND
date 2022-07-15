import { createError } from "../controller/errorHandling.js"
import User from "../models/usersModel.js"


//Update User
export const updateUser = async (req, res, next) => {
    if(req.params.id === req.user.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                $set : req.body
                },
                { $new:true }
            )
            res.status(200).json(updatedUser)
        } catch (err) {
            next(err)
        }
    }else {
        return next(createError(403, "Wrong credentials!"))
    }
}