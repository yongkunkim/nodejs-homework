import { BoardsService } from "../service/boards.service.js";

export class BoardsController {
  boardsService = new BoardsService();

  //질문글 조회하기
  getQuestionList = async (req, res, next) => {
    try {
      const userType = req.locals.userType;
      const questionList = await this.boardsService.getQuestionList(userType);
      res.status(200).send(questionList);
    } catch (e) {
      next(e);
    }
  };

  //질문글 상세조회
  getQuestionDetail = async (req, res, next) => {
    try {
      const userType = req.locals.userType;
      const boardId = parseInt(req.params.boardId);
      const questionDetail = await this.boardsService.getQuestionDetail(
        userType,
        boardId
      );
      res.status(200).send(questionDetail);
    } catch (e) {
      next(e);
    }
  };
  //질문글 검색으로 조회하기
  searchQuestionList = async (req, res, next) => {
    try {
      const userType = req.locals.userType;
      const { key } = req.query;
      if (!key) {
        res.status(400).json({ message: "검색어를 입력해주세요." });
      }
      const searchedList = await this.boardsService.searchQuestionList(
        key,
        userType
      );
      res.status(200).send(searchedList);
    } catch (e) {
      next(e);
    }
  };

  ////조회된 질문글 페이징처리
  getPagedQuestionList = async (req, res, next) => {
    try {
      const userType = req.locals.userType;
      const page = req.query.page;
      if (!page) {
        res.status(400).json({ message: "페이지를 선택해주세요." });
      }
      const pagedQuestionList = await this.boardsService.getPagedQuestionList(
        userType,
        page
      );
      res.status(200).send(pagedQuestionList);
    } catch (e) {
      next(e);
    }
  };
  //질문 생성하기
  createQuestion = async (req, res, next) => {
    try {
      const userId = parseInt(req.locals.userId);
      const userType = req.locals.userType;
      const { title, content } = req.body;
      const createdQuestion = await this.boardsService.createQuestion(
        title,
        content,
        userId,
        userType
      );
      res.status(200).send(createdQuestion);
    } catch (e) {
      next(e);
    }
  };

  //질문글 수정하기
  updateQuestion = async (req, res, next) => {
    try {
      const boardId = parseInt(req.params.boardId);
      const userId = parseInt(req.locals.userId);
      const { title, content } = req.body;
      if (!title && !content) {
        res.status(403).send({ message: "수정할 정보를 입력해주세요." });
      }
      const updatedQuestion = await this.boardsService.updateQuestion(
        boardId,
        userId,
        title,
        content
      );
      res.status(200).send(updatedQuestion);
    } catch (e) {
      next(e);
    }
  };

  //질문글 삭제하기(매니저도 가능)
  deleteQuestion = async (req, res, next) => {
    try {
      const boardId = parseInt(req.params.boardId);
      const userId = parseInt(req.locals.userId);
      const userType = req.locals.userType;
      await this.boardsService.deleteQuestion(boardId, userId, userType);
      return res.status(200).send({ message: "삭제완료" });
    } catch (e) {
      next(e);
    }
  };
}
