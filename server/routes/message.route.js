import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getUsersForSideBar, getMessages, sendMessage, } from '../controllers/message.controller.js';
import { upload } from '../middleware/upload.middleware.js';

const router = express.Router();

router.get("/users", protectRoute, getUsersForSideBar);

router.get("/:userId/:receiverId", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);
// router.post("/image", upload.single("image"), sendImage);

export default router;