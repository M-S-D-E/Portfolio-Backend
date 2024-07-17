import { Router } from "express";
import { addEducation,deleteEducation, getAllEducation, getEducation, updateEducation } from "../controllers/educationcontroller.js";
import { isAuthenticated } from "../middleware/auth.js";


export const educationRouter = Router()

educationRouter.post('/users/educations',isAuthenticated,addEducation)

educationRouter.get('/users/educations',isAuthenticated,getAllEducation)

educationRouter.get('/users/educations/:id',isAuthenticated,getEducation)

educationRouter.patch('/users/educations/:educationId',isAuthenticated, updateEducation);

educationRouter.delete('/users/educations/:educationId',isAuthenticated, deleteEducation);
