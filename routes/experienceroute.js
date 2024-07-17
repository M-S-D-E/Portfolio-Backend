import { Router } from "express";
import { addExperience, deleteExperience, getExperience,allExperiences, updateExperience } from "../controllers/experiencecontoller.js";
import {  isAuthenticated } from "../middleware/auth.js";



export const experienceRouter = Router()

experienceRouter.post('/users/experiences',isAuthenticated, addExperience)

experienceRouter.get('/users/experiences',isAuthenticated,allExperiences)

experienceRouter.get('/users/experiences/:id',isAuthenticated,getExperience)

experienceRouter.patch('/users/experiences/:experienceId',isAuthenticated,updateExperience)

experienceRouter.delete('/users/experiences/:experienceId',isAuthenticated,deleteExperience)