import { Router } from "express";
import { addExperience, deleteExperience, getExperience,allExperiences, updateExperience } from "../controllers/experiencecontoller.js";

export const experienceRouter = Router()

experienceRouter.post('/experience', addExperience)

experienceRouter.get('/experience',allExperiences)

experienceRouter.get('/experience/:id',getExperience)

experienceRouter.patch('/experience/:experienceId',updateExperience)

experienceRouter.delete('/experience/:experienceId',deleteExperience)