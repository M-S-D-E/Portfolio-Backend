import { Router } from "express";
import { addProject, deleteProject, getProject, allProjects, updateProject } from "../controllers/projectcontroller.js";


export const projectRouter = Router()

projectRouter.post('/project', addProject)

projectRouter.get('/project',allProjects)

projectRouter.get('/project/:id',getProject)

projectRouter.patch('/project/:projectId',updateProject)

projectRouter.delete('/project/:projectId',deleteProject)