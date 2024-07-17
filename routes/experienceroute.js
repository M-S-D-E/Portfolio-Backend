import { Router } from "express";
import { addExperience, deleteExperience, getExperience,allExperiences, updateExperience } from "../controllers/experiencecontoller.js";
import {  isAuthenticated } from "../middleware/auth.js";



export const experienceRouter = Router()

experienceRouter.post('/users/experience',isAuthenticated, addExperience)

experienceRouter.get('/users/experience',isAuthenticated,allExperiences)

experienceRouter.get('/users/experience/:id',isAuthenticated,getExperience)

experienceRouter.patch('/users/experience/:experienceId',isAuthenticated,updateExperience)

experienceRouter.delete('/users/experience/:experienceId',isAuthenticated,deleteExperience)