import express from "express"
import path from "path"
import cookieParser from "cookie-parser"
import { config } from "dotenv"
import router from "./routes/user.js"
import router1 from "./routes/task.js"
import { errs } from "./middleware/error.js"
import cors from "cors"

config({
    path : "./Data/config.env"
})


export const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())
app.use(
    cors({
    origin : [process.env.FRONTEND_URL],
    methods : ["GET" , "POST" , "PUT" , "DELETE"],
    credentials : true
}))
app.use(express.static(path.join(path.resolve() , "public")))
app.use(router)

app.use(router1)

app.use(errs)