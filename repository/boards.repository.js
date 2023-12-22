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

  //질문글 검색으로 조회하기 (일반회원)
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
}
