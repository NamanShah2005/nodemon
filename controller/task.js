import { errorHandler } from "../middleware/error.js";
import { task } from "../models/task.js";

export const newtask = async (req,res,next) => {
    try {
        let {Title , Description} = req.body
    const user = await req.user
    const check = await task.find({Title , user : user._id})
    if(check.length != 0) {
        let Name = req.user.Name
        return next(new errorHandler("Task already exists!" , 201 , Name))
    }
    let tasks = await task.create({
        Title,
        Description,
        user : req.user._id
    })
    res.status(201).send({
        success : true,
        task : tasks,
        message : "Task added successflly"
    })
    } catch (error) {
        next(error)
    }
}

export const alltasks = async (req,res,next) => {
    try {
        let user1 = req.user
    const tasks = await task.find({user : user1._id})
    res.status(200).json({
        success : true,
        tasks
    })
    } catch (error) {
      next(error)  
    }
}

export const updatetask = async(req,res,next) => {
    try {
        let {Title} = req.body
    let user1 = req.user
    let tasks = await task.findOne({Title , user : user1._id})
    if(!tasks) {
        let Name = req.user.Name
        return next(new errorHandler("Task not found" , 404 , Name))
    }
    tasks.isCompleted = !tasks.isCompleted
    await tasks.save()
    res.status(200).json({
        success : true,
        task : tasks
    })
    } catch (error) {
      next(error)  
    }
}

export const taskdetails = async(req,res,next) => {
    try {
        let {Title} = req.body
    let user1 = req.user
    let tasks = await task.findOne({Title , user : user1._id})
    if(!tasks) {
        let Name = req.user.Name
        return next(new errorHandler("Task not found" , 200 , Name))
    }
    res.status(200).json({
        success : true ,
        task : tasks
    })
    } catch (error) {
      next(error)  
    }
}

export const deletetask = async (req,res,next) => {
    try {
        let {Title} = req.body
    let user1 = req.user
    let check = await task.findOne({Title , user : user1._id})
    if(!check){
        return next(new Error("Task not found"))
    }
    await task.deleteOne({Title , user : user1._id})
    res.status(200).json({
        success : true,
        message : "Task deleted successfully"
    })
    } catch (error) {
      next(error)  
    }
}