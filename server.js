import { connectDB } from "./Data/user.js"
import { app } from "./id.js"

// const hostname = "127.0.0.1"
// const port = 3000

connectDB()

app.listen(process.env.PORT , process.env.HOSTNAME , () => {
    console.log(`the server is working at http://${process.env.HOSTNAME}:${process.env.PORT}/ in ${process.env.NODE_ENV} mode`)
})