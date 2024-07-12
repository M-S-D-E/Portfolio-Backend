import { getUser, login, signup } from "../controllers/user.js";
import { Router } from "express";


export const userRouter= Router();


userRouter.post('/users/signup',signup);


userRouter.get('/users/:id', getUser),

userRouter.post('/users/login',login)