import { Router } from "express";
import { addProject, deleteProject, getProject, allProjects, updateProject } from "../controllers/projectcontroller.js";
import {  isAuthenticated } from "../middleware/auth.js";
import { remoteUploads } from "../middleware/uploads.js";

export const projectRouter = Router()

projectRouter.post('/users/projects', remoteUploads.single('image'),isAuthenticated,addProject)

projectRouter.get('/users/projects',isAuthenticated,allProjects)

projectRouter.get('/users/projects/:id',isAuthenticated, getProject)

projectRouter.patch('/users/projects/:projectId',remoteUploads.single('image'),isAuthenticated,updateProject)

projectRouter.delete('/users/projects/:projectId',isAuthenticated,deleteProject)