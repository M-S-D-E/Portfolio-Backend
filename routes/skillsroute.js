import { Router } from "express";
import {  addSkill, getSkill, allSkills,updateSkill, deleteSkill } from "../controllers/skillscontroller.js";

export const skillRouter = Router()

skillRouter.post('/skill', addSkill)

skillRouter.get('/skill',allSkills)

skillRouter.get('/skill/:id',getSkill)

skillRouter.patch('/skill/:skillId',updateSkill)

skillRouter.delete('/skill/:skillId',deleteSkill)