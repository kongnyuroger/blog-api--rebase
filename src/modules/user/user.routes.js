import { Router } from "express";
import { userController } from "./user.controller.js";
import authenticateToken from "../../middleware/auth.js";

const router = Router()

router.post('/register', userController.create);
router.post('/login', userController.login);
router.get('/me',authenticateToken, userController.me)

export default router