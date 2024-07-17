import { Router } from "express";
import { addAchievement, deleteAchievement, getAchievement, allAchievements, updateAchievement } from "../controllers/achievementcontroller.js";
import { remoteUploads } from "../middleware/uploads.js";
import {  isAuthenticated } from "../middleware/auth.js";


export const achievementRouter = Router()

achievementRouter.post('/users/achievement',remoteUploads.single('image'),isAuthenticated, addAchievement)

achievementRouter.get('/users/achievement',isAuthenticated, allAchievements)

achievementRouter.get('/users/achievement/:id',isAuthenticated,getAchievement)

achievementRouter.patch('/users/achievements/:achievementId',remoteUploads.single('image'),isAuthenticated,updateAchievement)

achievementRouter.delete('/users/achievement/:achievementId',isAuthenticated,deleteAchievement)

