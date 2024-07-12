import { Router } from "express";
import { addUserProfile,deleteUserProfile, getAllUserProfile, getUserProfile, updateUserProfile} from "../controllers/userProfilecontroller.js";

export const userProfileRouter = Router()

userProfileRouter.post('/education', addUserProfile)

userProfileRouter.get('/education',getAllUserProfile)

userProfileRouter.get('/education/:id',getUserProfile)

userProfileRouter.patch('/education/:id:educationStatus',updateUserProfile)

userProfileRouter.delete('/education/:id',deleteUserProfile)