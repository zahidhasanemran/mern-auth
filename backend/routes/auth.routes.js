import express from "express";
import { loginController, SignupController, logoutController, forgotPassController, verifyEmailController, resetPassController } from "../controllers/auth.controllers.js"

const router = express.Router();

router.post("/signup", SignupController)
router.post("/login", loginController)
router.post("/logout", logoutController)
router.post("/forgot-password",forgotPassController)
router.post("/reset-password/:token",resetPassController)
router.post("/verify-email", verifyEmailController)

export default router;
