import { Router } from "express";
import { addEducation,deleteEducation, getAllEducation, getEducation, updateEducation } from "../controllers/educationcontroller.js";
import { checkUserSession } from "../middleware/auth.js";


export const educationRouter = Router()

educationRouter.post('/education',checkUserSession,addEducation)

educationRouter.get('/education',checkUserSession,getAllEducation)

educationRouter.get('/education/:id',checkUserSession,getEducation)

educationRouter.patch('/education/:educationId',checkUserSession, updateEducation);

educationRouter.delete('/education/:educationId',checkUserSession, deleteEducation);
