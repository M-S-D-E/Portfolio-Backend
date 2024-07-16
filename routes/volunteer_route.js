import { Router } from "express";
import { addVolunteer, deleteVolunteer, getVolunteer,  allVolunteer, updateVolunteer } from "../controllers/volunteercontroller.js";
import {  isAuthenticated } from "../middleware/auth.js";


export const volunteerRouter = Router();

volunteerRouter.post('/volunteer', isAuthenticated,addVolunteer);

volunteerRouter.get('/volunteer',isAuthenticated,allVolunteer);

volunteerRouter.get('/volunteer/:volunteerId',isAuthenticated,getVolunteer);

volunteerRouter.patch('/volunteer/:volunteerId', isAuthenticated,updateVolunteer);

volunteerRouter.delete('/volunteer/:volunteerId',isAuthenticated, deleteVolunteer);
