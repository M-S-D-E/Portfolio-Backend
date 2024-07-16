import { Router } from "express";
import {  addSkill, getSkill, allSkills,updateSkill, deleteSkill } from "../controllers/skillscontroller.js";
import { isAuthenticated } from "../middleware/auth.js";

export const skillRouter = Router()

skillRouter.post('/skill',isAuthenticated, addSkill)

skillRouter.get('/skill',isAuthenticated,allSkills)

skillRouter.get('/skill/:id',isAuthenticated,getSkill)

skillRouter.patch('/skill/:skillId',isAuthenticated,updateSkill)

skillRouter.delete('/skill/:skillId',isAuthenticated,deleteSkill)