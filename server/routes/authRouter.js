import express from "express";
import { login, logout, register, sendVerifyOtp, verifyEmail } from "../controllers/authController.js";
import userAuth from "../middleware/userauth.js";
const authRouter = express.Router();
authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/logout', logout);
authRouter.post('/sendVerifyOtp', userAuth, sendVerifyOtp);
authRouter.post('/verifyAccount', userAuth, verifyEmail);

export default authRouter;