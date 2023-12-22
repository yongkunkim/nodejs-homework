import { AnswersService } from "../service/answers.service.js";

export class AnswersController {
  answersService = new AnswersService();

  //답변 조회하기
  getAnswers = async (req, res, next) => {
    try {
      const boardId = parseInt(req.params.boardId);
      const userType = req.locals.userType;
      const answers = await this.answersService.getAnswers(userType, boardId);
      res.status(200).send(answers);
    } catch (e) {
      next(e);
    }
  };

  //답변 작성하기
  createAnswer = async (req, res, next) => {
    try {
      const boardId = parseInt(req.params.boardId);
      const userId = parseInt(req.locals.userId);
      const userType = req.locals.userType;
      const { content } = req.body;
      const createdAnswer = await this.answersService.createAnswer(
        boardId,
        userId,
        userType,
        content
      );
      res.status(200).send(createdAnswer);
    } catch (e) {
      next(e);
    }
  };

  //답변 수정
  updateAnswer = async (req, res, next) => {
    try {
      const boardId = parseInt(req.params.boardId);
      const answerId = parseInt(req.params.answerId);
      const userId = parseInt(req.locals.userId);
      const { content } = req.body;
      const updatedAnswer = await this.answersService.updateAnswer(
        answerId,
        userId,
        boardId,
        content
      );
      res.status(200).send(updatedAnswer);
    } catch (e) {
      next(e);
    }
  };

  //답변 채택
  selectAnswer = async (req, res, next) => {
    try {
      const boardId = parseInt(req.params.boardId);
      const answerId = parseInt(req.params.answerId);
      const userId = parseInt(req.locals.userId);
      const selectedAnswer = await this.answersService.selectAnswer(
        boardId,
        answerId,
        userId
      );
      res.status(200).send(selectedAnswer);
    } catch (e) {
      next(e);
    }
  };

  //답변 삭제
  deleteAnswer = async (req, res, next) => {
    try {
      const boardId = parseInt(req.params.boardId);
      const answerId = parseInt(req.params.answerId);
      const userId = parseInt(req.locals.userId);
      const userType = req.locals.userType;
      await this.answersService.deleteAnswer(
        boardId,
        answerId,
        userId,
        userType
      );
      res.status(200).send({ message: "삭제 완료." });
    } catch (e) {
      next(e);
    }
  };
}
