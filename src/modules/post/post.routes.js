import { Router } from "express";
import postController from "./post.controller.js";
import authenticateToken from "../../middleware/auth.js";

const router = Router()

router.post('/', authenticateToken, postController.create);
router.get('/', postController.list);
router.put('/:id', authenticateToken, postController.update);
router.get('/:id', authenticateToken, postController.getAPost);
router.delete('/:id', authenticateToken, postController.delete);
router.post('/:id/comment', authenticateToken, postController.postcomment);


export default router