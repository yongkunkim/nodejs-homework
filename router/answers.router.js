import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { AnswersController } from "../controller/answers.controller.js";

const router = express.Router();
const answersController = new AnswersController();

//답변 조회
router.get("/:boardId/answers", authMiddleware, answersController.getAnswers);
//답변 작성
router.post(
  "/:boardId/answers",
  authMiddleware,
  answersController.createAnswer
);
//답변 수정
router.put(
  "/:boardId/answers/:answerId",
  authMiddleware,
  answersController.updateAnswer
);

//답변 채택
router.put(
  "/:boardId/answers/:answerId/select",
  authMiddleware,
  answersController.selectAnswer
);
export default router;
