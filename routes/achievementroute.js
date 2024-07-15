import { Router } from "express";
import { addAchievement, deleteAchievement, getAchievement, allAchievements, updateAchievement } from "../controllers/achievementcontroller.js";
import { remoteUploads } from "../middleware/uploads.js";
import { checkUserSession } from "../middleware/auth.js";


export const achievementRouter = Router()

achievementRouter.post('/achievement',remoteUploads.fields([
    {name:"awards",maxCount:1},
    {name:"image",maxCount:1},
]),checkUserSession, addAchievement)

achievementRouter.get('/achievement',checkUserSession, allAchievements)

achievementRouter.get('/achievement/:id',checkUserSession,getAchievement)

achievementRouter.patch('/achievements/:achievementId',remoteUploads.fields([
    {name:"awards",maxCount:1},
    {name:"image",maxCount:1},
]),checkUserSession,updateAchievement)

achievementRouter.delete('/achievement/:achievementId',checkUserSession,deleteAchievement)

