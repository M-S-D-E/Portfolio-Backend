import { Router } from "express";
import {  addSkill, getSkill, allSkills,updateSkill, deleteSkill } from "../controllers/skillscontroller.js";
import { isAuthenticated } from "../middleware/auth.js";

export const skillRouter = Router()

skillRouter.post('/users/skill',isAuthenticated, addSkill)

skillRouter.get('/users/skill',isAuthenticated,allSkills)

skillRouter.get('/users/skill/:id',isAuthenticated,getSkill)

skillRouter.patch('/users/skill/:skillId',isAuthenticated,updateSkill)

skillRouter.delete('/users/skill/:skillId',isAuthenticated,deleteSkill)