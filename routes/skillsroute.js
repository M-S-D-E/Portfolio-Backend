import { Router } from "express";
import {  addSkill, getSkill, allSkills,updateSkill, deleteSkill } from "../controllers/skillscontroller.js";
import { isAuthenticated } from "../middleware/auth.js";

export const skillRouter = Router()

skillRouter.post('/users/skills',isAuthenticated, addSkill)

skillRouter.get('/users/skills',isAuthenticated,allSkills)

skillRouter.get('/users/skills/:id',isAuthenticated,getSkill)

skillRouter.patch('/users/skills/:skillId',isAuthenticated,updateSkill)

skillRouter.delete('/users/skills/:skillId',isAuthenticated,deleteSkill)