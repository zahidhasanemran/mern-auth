import express from "express";
import { loginController, SignupController, logoutController, forgotPassController } from "../controllers/auth.controllers.js"

const router = express.Router();

router.get("/signup", SignupController)
router.get("/login", loginController)
router.get("/logout", logoutController)
router.get("/forgot-password",forgotPassController)

export default router;
