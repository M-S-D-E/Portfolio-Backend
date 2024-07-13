import { Router } from "express";
import { addOrUpdateUserProfile, deleteUserProfile,  allUserProfiles, getUserProfile, updateUserProfile } from "../controllers/userProfilecontroller.js";

export const userProfileRouter = Router();

userProfileRouter.post('/userProfile', addOrUpdateUserProfile);

userProfileRouter.get('/userProfile',  allUserProfiles);

userProfileRouter.get('/userProfile/:id', getUserProfile);

userProfileRouter.patch('/userProfile/:userProfileId', updateUserProfile);

userProfileRouter.delete('/userProfile/:userProfileId', deleteUserProfile);
