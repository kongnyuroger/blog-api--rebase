import { Router } from "express";
import profileController from "./profilePic.controller.js";
import {upload} from '../../middleware/upload.js'
import authenticateToken from "../../middleware/auth.js";

const router = Router()

router.post(  "/",authenticateToken, upload.single("profile"),profileController.uploadProfile
);


export default router