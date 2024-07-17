import { Router } from "express";
import { addEducation,deleteEducation, getAllEducation, getEducation, updateEducation } from "../controllers/educationcontroller.js";
import { isAuthenticated } from "../middleware/auth.js";


export const educationRouter = Router()

educationRouter.post('/users/education',isAuthenticated,addEducation)

educationRouter.get('/users/education',isAuthenticated,getAllEducation)

educationRouter.get('/users/education/:id',isAuthenticated,getEducation)

educationRouter.patch('/users/education/:educationId',isAuthenticated, updateEducation);

educationRouter.delete('/users/education/:educationId',isAuthenticated, deleteEducation);
