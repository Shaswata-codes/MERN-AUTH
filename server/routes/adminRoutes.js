import express from "express";
import userAuth from "../middleware/userAuth.js";
import {
    getAdminStats,
    getAllPatients,
    getAllUsers,
    addUser,
    deleteUser,
    updateUser,
    getRecentActivities
} from "../controllers/adminController.js";

const adminRouter = express.Router();

// All admin routes require authentication
adminRouter.get('/stats', userAuth, getAdminStats);
adminRouter.get('/patients', userAuth, getAllPatients);
adminRouter.get('/users', userAuth, getAllUsers);
adminRouter.post('/user/add', userAuth, addUser);
adminRouter.put('/user/update/:userId', userAuth, updateUser);
adminRouter.delete('/user/delete/:userId', userAuth, deleteUser);
adminRouter.get('/activities', userAuth, getRecentActivities);

export default adminRouter;
