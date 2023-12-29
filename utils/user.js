import jwt from "jsonwebtoken"




export const setcookie = (user , res) => {
    let token = jwt.sign({_id : user.id} , process.env.JWT_SECRET)
        res.status(201).cookie("token" , token , {
            httpOnly : true , 
            expires : new Date(Date.now() + 15 * 60 * 1000),
            sameSite : process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure : process.env.NODE_ENV === "Development" ? false : true
        })
}
