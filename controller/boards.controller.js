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
    const boardId = req.params;
    const userId = parseInt(req.locals.userId);
    const { title, content } = req.body;
  };
}
