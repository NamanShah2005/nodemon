import Express from "express"
import { allusers, defpage, login, logout, register, updation, userdetail } from "../controller/user.js"
import { isAuthen } from "../middleware/user.js"

const router = Express.Router()

router.get("/" , defpage)

router.post("/register" , register)

router.post("/login" , login) 

router.get("/user/all" ,allusers)

router.get("/user/update" , updation)

router.get("/user/detail" , isAuthen , userdetail)

router.get("/logout" , logout)

export default router