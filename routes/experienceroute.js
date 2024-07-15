import { Router } from "express";
import { addExperience, deleteExperience, getExperience,allExperiences, updateExperience } from "../controllers/experiencecontoller.js";
import { checkUserSession } from "../middleware/auth.js";



export const experienceRouter = Router()

experienceRouter.post('/experience',checkUserSession, addExperience)

experienceRouter.get('/experience',checkUserSession,allExperiences)

experienceRouter.get('/experience/:id',checkUserSession,getExperience)

experienceRouter.patch('/experience/:experienceId',checkUserSession,updateExperience)

experienceRouter.delete('/experience/:experienceId',checkUserSession,deleteExperience)