import { prisma } from "../utils/prisma/index.js";

export class AnswersRepository {
  //답변 조회하기 (매니저)
  getAnswersByManager = async (boardId) => {
    return await prisma.answers.findMany({
      where: { boardId },
    });
  };

  //답변 조회하기 (일반유저)
  getAnswers = async (boardId) => {
    return await prisma.answers.findMany({
      where: { boardId },
      select: {
        content: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  };
  //boardId로 질문게시글이 존재하는지 확인
  selectBoardByBoardId = async (boardId) => {
    return await prisma.boards.findUnique({
      where: { boardId },
    });
  };

  //답변 작성하기
  createAnswer = async (userId, content, boardId) => {
    return await prisma.answers.create({
      data: { content, userId, boardId },
    });
  };

  //boardId로 answer 가져오기
  findAnswerByboardId = async (boardId) => {
    return await prisma.answers.findMany({
      where: { boardId },
    });
  };

  //answer찾기
  findAnswer = async (boardId, answerId) => {
    return await prisma.answers.findUnique({
      where: { boardId, answerId },
    });
  };

  //boardId로 board 가져오기
  checkBoardByboardId = async (boardId) => {
    return await prisma.boards.findUnique({
      where: { boardId },
    });
  };
  //질문자인지 확인하기
  getUserIdByBoardId = async (boardId) => {
    const userIdfromboardId = await prisma.boards.findUnique({
      where: { boardId },
      select: { userId: true },
    });
    return userIdfromboardId;
  };

  //답변 수정하기
  updateAnswer = async (boardId, answerId, content) => {
    const updatedAnswer = await prisma.answers.update({
      where: { boardId, answerId },
      data: { content },
    });
    return updatedAnswer;
  };

  //답변 채택하기
  selectAnswer = async (boardId, answerId) => {
    const answer = await prisma.answers.findMany({
      where: { boardId, answerId },
    });

    if (!answer) {
      throw new Error("해당하는 답변을 찾을 수 없습니다.");
    }

    const selectedAnswer = await prisma.answers.update({
      where: { boardId, answerId },
      data: { selected: true },
    });
    return selectedAnswer;
  };

  //채택된 답변 조회
  getSelectedAnswers = async (boardId) => {
    return await prisma.answers.findMany({
      where: {
        boardId,
        selected: true,
      },
    });
  };

  //채택 변경시에 기존 채택된 내용 취소
  unselectAnswer = async (boardId, answerId) => {
    const answer = await prisma.answers.findUnique({
      where: { boardId, answerId },
    });

    if (!answer) {
      throw new Error("해당하는 답변을 찾을 수 없습니다.");
    }

    return await prisma.answers.update({
      where: { boardId, answerId },
      data: { selected: false },
    });
  };

  //답변 삭제하기
  deleteAnswer = async (boardId, answerId) => {
    return await prisma.answers.delete({
      where: { boardId, answerId },
    });
  };

  // 채택된 답변 취소
  cancelSelected = async (boardId, answerId) => {
    return await prisma.answers.update({
      where: { boardId, answerId },
      data: { selected: false },
    });
  };
}
