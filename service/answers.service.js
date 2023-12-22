import { check } from "express-validator";
import { ValidateError } from "../middleware/errorhandling.middleware.js";
import { AnswersRepository } from "../repository/answers.repository.js";

export class AnswersService {
  answersRepository = new AnswersRepository();

  //답변 조회하기
  getAnswers = async (userType, boardId) => {
    if (userType === "manager") {
      const answerByManager = await this.answersRepository.getAnswersByManager(
        boardId
      );
      if (answerByManager.length < 1) {
        throw new ValidateError("답변이 존재하지 않습니다.", 404);
      }
      return answerByManager;
    } else {
      const answer = await this.answersRepository.getAnswers(boardId);
      if (answer.length < 1) {
        throw new ValidateError("답변이 존재하지 않습니다.", 404);
      }
      return answer;
    }
  };
  //답변 작성하기
  createAnswer = async (boardId, userId, userType, content) => {
    if (userType === "manager") {
      throw new ValidateError("매니저는 작성할 수 없습니다", 401);
    }
    if (!content) {
      throw new ValidateError("답변 내용을 입력해주세요.", 403);
    }
    const checkExistboard = await this.answersRepository.selectBoardByBoardId(
      boardId
    );
    if (!checkExistboard) {
      throw new ValidateError("질문이 존재하지 않습니다.", 404);
    }
    const createdAnswer = await this.answersRepository.createAnswer(
      userId,
      content,
      boardId
    );
    return createdAnswer;
  };

  //답변 수정하기
  updateAnswer = async (answerId, userId, boardId, content) => {
    try {
      const answers = await this.answersRepository.findAnswerByboardId(boardId);
      if (answers.length < 1) {
        throw new ValidateError("존재하지 않는 질문글입니다.", 403);
      }
      const answer = await this.answersRepository.findAnswer(boardId, answerId);
      console.log(answer);
      if (!answer) {
        throw new ValidateError("존재하지 않는 답변입니다", 404);
      }
      if (answer.userId !== userId) {
        throw new ValidateError("권한이 없습니다.", 401);
      }

      const updatedAnswer = await this.answersRepository.updateAnswer(
        boardId,
        answerId,
        content
      );
      return updatedAnswer;
    } catch (e) {
      throw e;
    }
  };
  //답변 채택하기
  selectAnswer = async (boardId, answerId, userId) => {
    const getuserId = await this.answersRepository.getUserIdByBoardId(boardId);
    if (!getuserId || parseInt(getuserId.userId) !== userId) {
      throw new ValidateError(
        "게시물 작성자만이 답변을 채택할 수 있습니다.",
        403
      );
    }
    const selectedAnswers = await this.answersRepository.getSelectedAnswers(
      boardId
    );
    if (selectedAnswers.length > 0) {
      const selectedAnswerId = selectedAnswers[0].answerId;
      await this.answersRepository.cancelSelected(boardId, selectedAnswerId);
    }

    return await this.answersRepository.selectAnswer(boardId, answerId);
  };
}
