import { Router } from "express";
import { addEducation,deleteEducation, getAllEducation, getEducation, updateEducation } from "../controllers/educationcontroller.js";
import { isAuthenticated } from "../middleware/auth.js";


export const educationRouter = Router()

educationRouter.post('/education',isAuthenticated,addEducation)

educationRouter.get('/education',isAuthenticated,getAllEducation)

educationRouter.get('/education/:id',isAuthenticated,getEducation)

educationRouter.patch('/education/:educationId',isAuthenticated, updateEducation);

educationRouter.delete('/education/:educationId',isAuthenticated, deleteEducation);
