import { Router } from "express";
import { addProject, deleteProject, getProject, allProjects, updateProject } from "../controllers/projectcontroller.js";
import {  isAuthenticated } from "../middleware/auth.js";
import { remoteUploads } from "../middleware/uploads.js";

export const projectRouter = Router()

projectRouter.post('/project', remoteUploads.single('image'),isAuthenticated,addProject)

projectRouter.get('/project',isAuthenticated,allProjects)

projectRouter.get('/project/:id',isAuthenticated, getProject)

projectRouter.patch('/project/:projectId',remoteUploads.single('image'),isAuthenticated,updateProject)

projectRouter.delete('/project/:projectId',isAuthenticated,deleteProject)