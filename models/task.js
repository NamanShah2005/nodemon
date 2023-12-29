import mongoose from "mongoose";
import { msg } from "./user.js";

const schema = mongoose.Schema({
    Title : {
        type : String,
        required : true,
        unique : false
    },
    Description : {
        type : String,
        required : true,
        unique : false
    },
    isCompleted : {
        type : Boolean,
        default : false
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        reference : "msg",
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
})

export const task = mongoose.model("task" , schema)