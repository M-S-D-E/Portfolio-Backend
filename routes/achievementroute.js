import { Router } from "express";
import { addAchievement, deleteAchievement, getAchievement, allAchievements, updateAchievement } from "../controllers/achievementcontroller.js";
import { remoteUploads } from "../middleware/uploads.js";
import {  isAuthenticated } from "../middleware/auth.js";


export const achievementRouter = Router()

achievementRouter.post('/users/achievements',remoteUploads.single('image'),isAuthenticated, addAchievement)

achievementRouter.get('/users/achievements',isAuthenticated, allAchievements)

achievementRouter.get('/users/achievements/:id',isAuthenticated,getAchievement)

achievementRouter.patch('/users/achievements/:achievementId',remoteUploads.single('image'),isAuthenticated,updateAchievement)

achievementRouter.delete('/users/achievements/:achievementId',isAuthenticated,deleteAchievement)

