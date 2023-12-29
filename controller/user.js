import { msg } from "../models/user.js"
import bcrypt from "bcrypt"
import { setcookie } from "../utils/user.js"

export const defpage = (req, res) => {
    try {
        res.send("nice workings")
    } catch (error) {
        next(error)
    }
}

export const register = async (req, res) => {
    try {
        let { Name, Password, Email } = req.body
    let user = await msg.findOne({ Email })
    if (user) {
        return res.status(404).json({
            success: false,
            message: "user already exist"
        })
    }
    else {
        const hashedPassword = await bcrypt.hash(Password, 10)
        let user = await msg.create({
            Name,
            Password: hashedPassword,
            Email
        })
        setcookie(user , res)
        res.json({
            success: true,
            user
        })
    }
    } catch (error) {
     next(error)   
    }
}

export const login = async (req, res) => {
    try {
        let { Name, Password, Email } = req.body
    let user = await msg.findOne({ Email })
    console.log(user)
    if (!user) {
        res.send("User not found")
    }
    else {
        const check = await bcrypt.compare(Password, user.Password)
        if (!check) {
            res.send("Incorrect Password , user not found")
        }
        else {
            setcookie(user , res) 
            res.send("moving to the next page")
        }
    }
    } catch (error) {
     next(error)   
    }
}

export const allusers = async (req, res) => {
    try {
        const user = await msg.find()
    res.json({
        success: true,
        user
    })
    } catch (error) {
      next(error)  
    }
}

export const updation = async (req, res) => {
    try {
        const { Name, Password, Email, newPassword } = req.body
    let user = await msg.findOne({ Email })
    if (!user) {
        res.send("User not found")
    }
    else {
        const checkin = await bcrypt.compare(Password, user.Password)
        if (!checkin) {
            res.send("Incorrect Password , user not found")
        }
        else {
            let newHashedPassword = await bcrypt.hash(newPassword, 10)
            await msg.updateOne({ Email: Email }, { $set: { Password: newHashedPassword } })
            user = await msg.find({ Email })
            res.json({
                success: true,
                user
            })
        }
    }
    } catch (error) {
     next(error)   
    }
}

export const userdetail = async (req, res) => {
    try {
        console.log(req.user._id)
    res.status(200).json({
        success : true,
        user : req.user
    })
    } catch (error) {
      next(error)  
    }
}

export const logout = async (req,res) => {
    try {
        res.status(200).cookie("token" , null , {
            httpOnly : true , expires : new Date(Date.now())
        }).json({
            success : false,
            message : "Successfully logged out",
            sameSite : process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure : process.env.NODE_ENV === "Development" ? false : true
        })
    } catch (error) {
        next(error)
    }
}