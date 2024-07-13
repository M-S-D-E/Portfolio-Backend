import { Router } from "express";
import { addAchievement, deleteAchievement, getAchievement, allAchievements, updateAchievement } from "../controllers/achievementcontroller.js";
import { remoteUploads } from "../middleware/uploads.js";


export const achievementRouter = Router()

achievementRouter.post('/achievement',remoteUploads.single('image'), addAchievement)

achievementRouter.get('/achievement',allAchievements)

achievementRouter.get('/achievement/:id',getAchievement)

achievementRouter.patch('/achievements/:achievementId',updateAchievement)

achievementRouter.delete('/achievement/:achievementId',deleteAchievement)

