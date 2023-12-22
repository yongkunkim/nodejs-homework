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
        throw new ValidateError("매니저는 질문글을 작성할 수 없습니다.", 401);
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
}
