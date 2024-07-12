import { Router } from "express";
import {  addSkill, getSkill, getAllSkill,updateSkill, deleteSkill } from "../controllers/skillscontroller.js";

export const skillRouter = Router()

skillRouter.post('/education', addSkill)

skillRouter.get('/education',getAllSkill)

skillRouter.get('/education/:id',getSkill)

skillRouter.patch('/education/:id:educationStatus',updateSkill)

skillRouter.delete('/education/:id',deleteSkill)