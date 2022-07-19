import Users from '../models/usersModel.js'
import jwt from 'jsonwebtoken'

export const refreshToken = async (req, res) => {
    try {
        const refreshTokenCookie = req.cookies.refreshToken
        
        if(!refreshTokenCookie) return res.status(401)

        const user = await Users.findOne({
            refresh_token: refreshTokenCookie
        })

        if(!user) return res.status(403)

        jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH_KEY, (err, token) => {
            if(err) return res.status(403)
            
            const accessToken = jwt.sign({id: token.id}, process.env.JWT_ACCESS_KEY,{
                expiresIn: '30s'
            })
            res.status(200).json(accessToken)
        })
    } catch (err) {
        console.log(err)
    }
}