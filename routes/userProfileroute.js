import { Router } from "express";
import { addUserProfile,deleteUserProfile, getAllUserProfile, getUserProfile, updateUserProfile} from "../controllers/userProfilecontroller.js";

export const userProfileRouter = Router()

userProfileRouter.post('/userProfile', addUserProfile)

userProfileRouter.get('/userProfile',getAllUserProfile)

userProfileRouter.get('/userProfile/:id',getUserProfile)

userProfileRouter.patch('/userProfile/:id:userProfileStatus',updateUserProfile)

userProfileRouter.delete('/userProfile/:id',deleteUserProfile)