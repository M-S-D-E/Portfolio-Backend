import { Router } from "express";
import { addAchievement, deleteAchievement, getAchievement, allAchievements, updateAchievement } from "../controllers/achievementcontroller.js";
import { remoteUploads } from "../middleware/uploads.js";
import {  isAuthenticated } from "../middleware/auth.js";


export const achievementRouter = Router()

achievementRouter.post('/achievement',remoteUploads.single('image'),isAuthenticated, addAchievement)

achievementRouter.get('/achievement',isAuthenticated, allAchievements)

achievementRouter.get('/achievement/:id',isAuthenticated,getAchievement)

achievementRouter.patch('/achievements/:achievementId',remoteUploads.single('image'),isAuthenticated,updateAchievement)

achievementRouter.delete('/achievement/:achievementId',isAuthenticated,deleteAchievement)

