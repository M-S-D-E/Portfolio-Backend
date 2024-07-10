import { Router } from "express";
import { addVolunteer, deleteVolunteer, getVolunteer, getVolunteers, updateVolunteer } from "../controllers/volunteercontoller.js";

export const volunteerRouter = Router()

volunteerRouter.post('/volunteer', addVolunteer)

volunteerRouter.get('/volunteer',getVolunteers)

volunteerRouter.get('/volunteer/:id',getVolunteer)

volunteerRouter.patch('/volunteer/:id:volunteerStatus',updateVolunteer)

volunteerRouter.delete('/volunteer/:id',deleteVolunteer)