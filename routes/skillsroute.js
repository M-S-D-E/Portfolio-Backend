import { Router } from "express";
import {  addSkill, getSkill, allSkills,updateSkill, deleteSkill } from "../controllers/skillscontroller.js";
import { checkUserSession } from "../middleware/auth.js";

export const skillRouter = Router()

skillRouter.post('/skill',checkUserSession, addSkill)

skillRouter.get('/skill',checkUserSession,allSkills)

skillRouter.get('/skill/:id',checkUserSession,getSkill)

skillRouter.patch('/skill/:skillId',checkUserSession,updateSkill)

skillRouter.delete('/skill/:skillId',checkUserSession,deleteSkill)