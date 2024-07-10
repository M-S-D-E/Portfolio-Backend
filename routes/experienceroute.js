import { Router } from "express";
import { addExperience, deleteExperience, getExperience, getExperiences, updateExperience } from "../controllers/experiencecontoller.js";

export const experienceRouter = Router()

experienceRouter.post('/experience', addExperience)

experienceRouter.get('/experience',getExperiences)

experienceRouter.get('/experience/:id',getExperience)

experienceRouter.patch('/experience/:id:experienceStatus',updateExperience)

experienceRouterr.delete('/experience/:id',deleteExperience)