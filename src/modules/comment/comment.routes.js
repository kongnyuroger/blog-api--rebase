import { Router } from "express";
import authenticateToken from "../../middleware/auth.js";
import commentController from "./comment.controller.js";

const router = Router()

router.post('/posts/:id', authenticateToken, commentController.postcomment);
router.delete('/:id', authenticateToken, commentController.delete);


export default router