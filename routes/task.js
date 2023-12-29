import express from "express";
import { alltasks, deletetask, newtask, taskdetails, updatetask } from "../controller/task.js";
import { isAuthen } from "../middleware/user.js";

const router1 = express.Router()

router1.get("/task/new", isAuthen, newtask)

router1.get("/task/all", isAuthen, alltasks)

router1.put("/task/update", isAuthen, updatetask)

router1.get("/task/detail", isAuthen, taskdetails)

router1.delete("/task/delete", isAuthen, deletetask)

export default router1