import { Router } from "express";
import { addExperience, deleteExperience, getExperience,allExperiences, updateExperience } from "../controllers/experiencecontoller.js";
import {  isAuthenticated } from "../middleware/auth.js";



export const experienceRouter = Router()

experienceRouter.post('/experience',isAuthenticated, addExperience)

experienceRouter.get('/experience',isAuthenticated,allExperiences)

experienceRouter.get('/experience/:id',isAuthenticated,getExperience)

experienceRouter.patch('/experience/:experienceId',isAuthenticated,updateExperience)

experienceRouter.delete('/experience/:experienceId',isAuthenticated,deleteExperience)