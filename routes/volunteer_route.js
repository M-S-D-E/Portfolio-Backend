import { Router } from "express";
import { addVolunteer, deleteVolunteer, getVolunteer,  allVolunteer, updateVolunteer } from "../controllers/volunteercontroller.js";
import {  isAuthenticated } from "../middleware/auth.js";


export const volunteerRouter = Router();

volunteerRouter.post('/users/volunteer', isAuthenticated,addVolunteer);

volunteerRouter.get('/users/volunteer',isAuthenticated,allVolunteer);

volunteerRouter.get('/users/volunteer/:volunteerId',isAuthenticated,getVolunteer);

volunteerRouter.patch('/users/volunteer/:volunteerId', isAuthenticated,updateVolunteer);

volunteerRouter.delete('/users/volunteer/:volunteerId',isAuthenticated, deleteVolunteer);
