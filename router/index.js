import express from "express";
import authRouter from "./auth.router.js";
import usersRouter from "../router/users.router.js";
const router = express.Router();
router.use("/", authRouter);
router.use("/users", usersRouter);

export default router;
