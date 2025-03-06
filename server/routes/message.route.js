import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getUsersForSideBar } from '../controllers/message.controller.js';

const router = express.Router();

router.get("/users", protectRoute, getUsersForSideBar);

export default router;