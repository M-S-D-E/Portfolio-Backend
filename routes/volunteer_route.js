import { Router } from "express";
import { addVolunteer, deleteVolunteer, getVolunteer,  allVolunteer, updateVolunteer } from "../controllers/volunteercontroller.js";
import { checkUserSession } from "../middleware/auth.js";


export const volunteerRouter = Router();

volunteerRouter.post('/volunteer', checkUserSession,addVolunteer);

volunteerRouter.get('/volunteer',checkUserSession,allVolunteer);

volunteerRouter.get('/volunteer/:volunteerId', checkUserSession,getVolunteer);

volunteerRouter.patch('/volunteer/:volunteerId', checkUserSession,updateVolunteer);

volunteerRouter.delete('/volunteer/:volunteerId',checkUserSession, deleteVolunteer);
