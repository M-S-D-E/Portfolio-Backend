import { Router } from "express";
import { addProject, deleteProject, getProject, allProjects, updateProject } from "../controllers/projectcontroller.js";
import { checkUserSession } from "../middleware/auth.js";
import { remoteUploads } from "../middleware/uploads.js";

export const projectRouter = Router()

projectRouter.post('/project', remoteUploads.single('image'),checkUserSession,addProject)

projectRouter.get('/project',checkUserSession,allProjects)

projectRouter.get('/project/:id',checkUserSession, getProject)

projectRouter.patch('/project/:projectId',remoteUploads.single('image'),checkUserSession,updateProject)

projectRouter.delete('/project/:projectId',checkUserSession,deleteProject)