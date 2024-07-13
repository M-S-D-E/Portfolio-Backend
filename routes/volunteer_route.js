import { Router } from "express";
import { addVolunteer, deleteVolunteer, getVolunteer,  allVolunteer, updateVolunteer } from "../controllers/volunteercontroller.js";

export const volunteerRouter = Router();

volunteerRouter.post('/volunteer', addVolunteer);

volunteerRouter.get('/volunteer', allVolunteer);

volunteerRouter.get('/volunteer/:volunteerId', getVolunteer);

volunteerRouter.patch('/volunteer/:volunteerId', updateVolunteer);

volunteerRouter.delete('/volunteer/:volunteerId', deleteVolunteer);
