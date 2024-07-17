import { Router } from "express";
import { addVolunteer, deleteVolunteer, getVolunteer,  allVolunteer, updateVolunteer } from "../controllers/volunteercontroller.js";
import {  isAuthenticated } from "../middleware/auth.js";


export const volunteerRouter = Router();

volunteerRouter.post('/users/volunteering', isAuthenticated,addVolunteer);

volunteerRouter.get('/users/volunteering',isAuthenticated,allVolunteer);

volunteerRouter.get('/users/volunteering/:volunteerId',isAuthenticated,getVolunteer);

volunteerRouter.patch('/users/volunteering/:volunteerId', isAuthenticated,updateVolunteer);

volunteerRouter.delete('/users/volunteering/:volunteerId',isAuthenticated, deleteVolunteer);
