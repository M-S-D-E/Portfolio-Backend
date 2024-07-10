import { Router } from "express";
import { addProject, deleteProject, getProject, getProjects, updateProject } from "../controllers/projectcontroller.js";


export const projectRouter = Router()

projectRouter.post('/project', addProject)

projectRouter.get('/project',getProjects)

projectRouter.get('/project/:id',getProject)

projectRouter.patch('/project/:id:projectStatus',updateProject)

projectRouter.delete('/project/:id',deleteProject)