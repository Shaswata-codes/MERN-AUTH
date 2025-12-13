import express from "express";
import userAuth from "../middleware/userAuth.js";
import { getUserData, updateUserProfile, updateHealthStats } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get('/data', userAuth, getUserData);
userRouter.put('/profile', userAuth, updateUserProfile);
userRouter.put('/health-stats', userAuth, updateHealthStats);

export default userRouter;