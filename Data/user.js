import mongoose from "mongoose"

export const connectDB = () => {
    mongoose.connect(process.env.MONGOCONNECT , {dbName : "backendMain"}).then(() => {
    console.log("Database connected")
}).catch((e) => {
    console.log(e)
})
}