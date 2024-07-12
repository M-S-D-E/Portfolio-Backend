import { Router } from "express";
import { addAchievement, deleteAchievement, getAchievement, getAllAchievement, updateAchievement } from "../controllers/achievementcontroller.js";


export const achievementRouter = Router()

achievementRouter.post('/achievement', addAchievement)

achievementRouter.get('/achievement',getAllAchievement)

achievementRouter.get('/achievement/:id',getAchievement)

achievementRouter.patch('/achievement/:id:achievementStatus',updateAchievement)

achievementRouter.delete('/achievement/:id',deleteAchievement)

