import express from "express";
import { AuthController } from "../controller/auth.controller.js";
import ValidationCheck from "../middleware/validationMiddleware.js";

const router = express.Router();
const authController = new AuthController();

//회원가입
router.post("/sign-up", ValidationCheck, authController.signup);

//로그인
router.post("/sign-in", authController.signin);

export default router;
