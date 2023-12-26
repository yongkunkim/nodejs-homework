import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { BoardsController } from "../controller/boards.controller.js";
import { AuthController } from "../controller/auth.controller.js";

const router = express.Router();
const boardsController = new BoardsController();

//질문글 리스트 확인
router.get("/", authMiddleware, boardsController.getQuestionList);
//질문글 상세조회
router.get(
  "/detail/:boardId",
  authMiddleware,
  boardsController.getQuestionDetail
);
//질문글 검색으로 조회하기
router.get("/search", authMiddleware, boardsController.searchQuestionList);
//조회된 질문글 페이징처리
router.get("/paged", authMiddleware, boardsController.getPagedQuestionList);
//질문글 작성하기
router.post("/", authMiddleware, boardsController.createQuestion);
//질문글 수정하기
router.put("/:boardId", authMiddleware, boardsController.updateQuestion);
//질문글 삭제하기
router.delete("/:boardId", authMiddleware, boardsController.deleteQuestion);
export default router;
