import { ValidateError } from "../middleware/errorhandling.middleware.js";
import { BoardsRepository } from "../repository/boards.repository.js";

export class BoardsService {
  boardsRepository = new BoardsRepository();

  //질문글 조회하기
  getQuestionList = async (userType) => {
    if (userType === "manager") {
      return await this.boardsRepository.getQuestionListByManager();
    } else {
      return await this.boardsRepository.getQuestionList();
    }
  };

  //질문글 상세조회
  getQuestionDetail = async (userType, boardId) => {
    const board = await this.boardsRepository.getBoardByBoardId(boardId);
    if (userType === "manager") {
      const questionDetailManager =
        await this.boardsRepository.getQuestionDetailByManager(boardId);
      if (!questionDetailManager) {
        throw new ValidateError("질문글이 존재하지 않습니다", 404);
      }
      return questionDetailManager;
    } else {
      const questionDetail = await this.boardsRepository.getQuestionDetail(
        boardId
      );
      if (!questionDetail) {
        throw new ValidateError("질문글이 존재하지 않습니다", 404);
      }
      return questionDetail;
    }
  };
  //질문글 검색으로 조회하기
  searchQuestionList = async (key, userType) => {
    if (userType === "manager") {
      return await this.boardsRepository.searchQuestionListByManager(key);
    }
    return await this.boardsRepository.searchQuestionList(key);
  };

  //질문글 생성하기
  createQuestion = async (title, content, userId, userType) => {
    try {
      if (userType === "manager") {
        throw new ValidateError("매니저는 작성할 수 없습니다.", 401);
      }
      if (!title && !content) {
        throw new ValidateError("제목과 내용을 모두 입력해주세요", 403);
      }
      const createdQuestion = await this.boardsRepository.createQuestion(
        title,
        content,
        userId
      );
      return createdQuestion;
    } catch (e) {
      throw e;
    }
  };

  //질문글 수정하기
  updateQuestion = async (boardId, userId, title, content) => {
    try {
      const userIdfromboardId =
        await this.boardsRepository.getuserIdfromboardId(boardId);
      if (!userIdfromboardId) {
        throw new ValidateError("질문글이 존재하지 않습니다.", 404);
      }
      if (userIdfromboardId.userId !== userId) {
        throw new ValidateError("권한이 없습니다.", 401);
      }
      const existAnswer = await this.boardsRepository.checkexistAnswer(boardId);
      if (existAnswer.length > 0) {
        throw new ValidateError("답변이 있는 질문은 수정이 불가능합니다.", 401);
      }
      const updatedQuestion = await this.boardsRepository.updateQuestion(
        boardId,
        title,
        content
      );
      return updatedQuestion;
    } catch (e) {
      throw e;
    }
  };

  //질문글 삭제하기
  deleteQuestion = async (boardId, userId, userType) => {
    try {
      if (userType === "manager") {
        return await this.boardsRepository.deleteQuestion(boardId);
      }
      const userIdfromboardId =
        await this.boardsRepository.getuserIdfromboardId(boardId);
      if (!userIdfromboardId) {
        throw new ValidateError("질문글이 존재하지 않습니다.", 404);
      }
      if (userIdfromboardId.userId !== userId) {
        throw new ValidateError("권한이 없습니다.", 401);
      }
      return await this.boardsRepository.deleteQuestion(boardId);
    } catch (e) {
      throw e;
    }
  };
}
