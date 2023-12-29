import mongoose from "mongoose"

export const connectDB = () => {
    mongoose.connect(process.env.MONGOCONNECT , {dbName : "backendMain"}).then((c) => {
    console.log(`Database connected with ${c.connection.host}`)
}).catch((e) => {
    console.log(e)
})
}