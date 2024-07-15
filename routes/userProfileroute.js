import { Router } from "express";
import { addOrUpdateUserProfile, deleteUserProfile,  allUserProfiles, getUserProfile, updateUserProfile } from "../controllers/userProfilecontroller.js";
import { remoteUploads } from "../middleware/uploads.js";
import { checkUserSession } from "../middleware/auth.js";

export const userProfileRouter = Router();

userProfileRouter.post('/userProfile',remoteUploads.fields([
    {name:"profilePicture",maxCount:1},
    {name:"resume",maxCount:1},
]), checkUserSession,addOrUpdateUserProfile);

userProfileRouter.get('/userProfile',  allUserProfiles);

userProfileRouter.get('/userProfile/:id', getUserProfile);

userProfileRouter.patch('/userProfile/:userProfileId',remoteUploads.fields([
    {name:"profilePicture",maxCount:1},
    {name:"resume",maxCount:1},
]),checkUserSession, updateUserProfile);

userProfileRouter.delete('/userProfile/:userProfileId', deleteUserProfile);
