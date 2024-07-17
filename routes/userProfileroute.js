import { Router } from "express";
import { addOrUpdateUserProfile, getUserProfile, updateUserProfile } from "../controllers/userProfilecontroller.js";
import { remoteUploads } from "../middleware/uploads.js";
import {  isAuthenticated } from "../middleware/auth.js";

export const userProfileRouter = Router();

userProfileRouter.post('/users/userProfile', remoteUploads.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "resume", maxCount: 1 },
]), isAuthenticated, addOrUpdateUserProfile);

userProfileRouter.get('/users/userProfile', isAuthenticated, getUserProfile);



userProfileRouter.patch('/users/userProfile/:userProfileId', remoteUploads.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "resume", maxCount: 1 },
]), isAuthenticated, updateUserProfile);

