import { getUser, getUsers, login, signup } from "../controllers/user.js";
import { Router } from "express";


export const userRouter= Router();

userRouter.get('/users', getUsers)
userRouter.post('/users/signup',signup);
userRouter.get('/users/:userName', getUser),

userRouter.post('/users/login',login)