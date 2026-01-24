import {Router} from "express"
import { getMe, loginUser } from "../src/controllers/authController.js"
import { verifyToken } from "../middleware/verifyToken.middleware.js";

const router = Router()

router.post('/login', loginUser)
router.get("/me", verifyToken, getMe);  

export default router