import mongoose from "mongoose";

const schema = mongoose.Schema({
    Name : {
        type : String,
        required : true
    },
    Email : {
        type : String,
        required : true,
        unique : true
    },
    Password : {
        type : String,
        required : true,
        // select : false
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
})

export const msg = mongoose.model("msg" , schema)