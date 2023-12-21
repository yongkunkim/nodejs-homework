import express from "express";
import authRouter from "../router/auth.rouer.js";
const router = express.Router();
router.use("/", authRouter);

export default router;
