import jwt from "jsonwebtoken"
import { msg } from "../models/user.js"

export const isAuthen = async (req, res , next) => {
    let token1 = req.cookies.token
    if(!token1){
        return res.status(404).json({
            success : false,
            message : "Login First"
        })
    }
    const myId = await jwt.verify(token1 , process.env.JWT_SECRET)
    req.user = await msg.findById(myId)
    next()
}