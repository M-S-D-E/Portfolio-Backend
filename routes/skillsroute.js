import { Router } from "express";
import {  addSkill, getSkill, getAllSkill,updateSkill, deleteSkill } from "../controllers/skillscontroller.js";

export const skillRouter = Router()

skillRouter.post('/skill', addSkill)

skillRouter.get('/skill',getAllSkill)

skillRouter.get('/skill/:id',getSkill)

skillRouter.patch('/skill/:id:skillStatus',updateSkill)

skillRouter.delete('/skill/:id',deleteSkill)