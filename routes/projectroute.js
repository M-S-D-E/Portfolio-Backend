import { Router } from "express";
import { addProject, deleteProject, getProject, getAllProject, updateProject } from "../controllers/projectcontroller.js";


export const projectRouter = Router()

projectRouter.post('/project', addProject)

projectRouter.get('/project',getAllProject)

projectRouter.get('/project/:id',getProject)

projectRouter.patch('/project/:id:projectStatus',updateProject)

projectRouter.delete('/project/:id',deleteProject)