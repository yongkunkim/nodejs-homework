import express from "express";
import authRouter from "./auth.router.js";
import usersRouter from "../router/users.router.js";
import boardsRouter from "../router/boards.router.js";
import answersRouter from "../router/answers.router.js";
const router = express.Router();

// 로그인, 회원가입
router.use("/", authRouter);
// 유저 승급
router.use("/users", usersRouter);
// 질문게시판
router.use("/boards", boardsRouter);
// 답변글
router.use("/boards", answersRouter);

export default router;
