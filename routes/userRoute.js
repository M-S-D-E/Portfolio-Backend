import { signup } from "../controllers/user.js";
import { Router } from "express";


export const userRouter= Router();


userRouter.post('/users/signup',signup)