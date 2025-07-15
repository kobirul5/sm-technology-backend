import express from 'express';
import { createUser, getUserByEmailIfValidToken, loginUser } from './user.controller';
import { verifyJWT } from '../../middlewares/auth.middleware';

export const userRouter = express.Router()


userRouter.post("/register", createUser)
userRouter.post("/login", loginUser)
userRouter.get("/me", verifyJWT, getUserByEmailIfValidToken)



