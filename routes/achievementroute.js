import { Router } from "express";
import { addAchievement, deleteAchievement, getAchievement, allAchievements, updateAchievement } from "../controllers/achievementcontroller.js";
import { remoteUploads } from "../middleware/uploads.js";
import { checkUserSession } from "../middleware/auth.js";


export const achievementRouter = Router()

achievementRouter.post('/achievement',remoteUploads.single('image'),checkUserSession, addAchievement)

achievementRouter.get('/achievement',checkUserSession, allAchievements)

achievementRouter.get('/achievement/:id',checkUserSession,getAchievement)

achievementRouter.patch('/achievements/:achievementId',remoteUploads.single('image'),checkUserSession,updateAchievement)

achievementRouter.delete('/achievement/:achievementId',checkUserSession,deleteAchievement)

