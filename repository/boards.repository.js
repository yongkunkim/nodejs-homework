import { prisma } from "../utils/prisma/index.js";

export class BoardsRepository {
  //질문글 조회하기 (매니저)
  getQuestionListByManager = async () => {
    return await prisma.boards.findMany();
  };

  //질문글 조회하기 (일반유저)
  getQuestionList = async () => {
    return await prisma.boards.findMany({
      select: {
        title: true,
        content: true,
      },
    });
  };

  //boardId를 이용해서 board가져오기
  getBoardByBoardId = async (boardId) => {
    return await prisma.boards.findUnique({
      where: { boardId },
    });
  };
  //질문글 상세조회 (매니저)
  getQuestionDetailByManager = async (boardId) => {
    return await prisma.boards.findUnique({
      where: { boardId },
    });
  };

  //질문글 상세조회 (일반유저)
  getQuestionDetail = async (boardId) => {
    return await prisma.boards.findUnique({
      where: { boardId },
      select: {
        title: true,
        content: true,
      },
    });
  };
  //질문글 검색으로 조회하기 (매니저)
  searchQuestionListByManager = async (key) => {
    return await prisma.boards.findMany({
      where: {
        OR: [
          { title: { startsWith: `%${key}` } },
          { content: { startsWith: `%${key}` } },
        ],
      },
    });
  };

  //질문글 검색으로 조회하기 (일반유저)
  searchQuestionList = async (key) => {
    return await prisma.boards.findMany({
      where: {
        OR: [
          { title: { startsWith: `%${key}` } },
          { content: { startsWith: `%${key}` } },
        ],
      },
      select: {
        title: true,
        content: true,
      },
    });
  };
  //질문글 생성하기
  createQuestion = async (title, content, userId) => {
    const createdQuestion = await prisma.boards.create({
      data: {
        title,
        content,
        userId,
      },
    });
    return createdQuestion;
  };

  //boardId를 이용해서 board의 userId 찾기
  getuserIdfromboardId = async (boardId) => {
    const userIdfromboardId = await prisma.boards.findUnique({
      where: { boardId },
      select: { userId: true },
    });
    return userIdfromboardId;
  };

  //질문글 수정하기
  updateQuestion = async (boardId, title, content) => {
    const updatedQuestion = await prisma.boards.update({
      where: { boardId },
      data: {
        title,
        content,
      },
    });
    return updatedQuestion;
  };

  //질문글 삭제하기
  deleteQuestion = async (boardId) => {
    return await prisma.boards.delete({
      where: { boardId },
    });
  };
}
