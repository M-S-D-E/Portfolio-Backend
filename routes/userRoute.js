import { getUser, getUsers, login, signup, token,logout } from "../controllers/user.js";
import { Router } from "express";


export const userRouter= Router();

userRouter.get('/users/getUser', getUsers)
userRouter.post('/users/auth/signup',signup);
userRouter.get('/users/auth/:userName', getUser),

userRouter.post('/users/auth/login',login)
userRouter.post("/users/auth/logout", logout);
userRouter.post('/users/auth/token',token)
