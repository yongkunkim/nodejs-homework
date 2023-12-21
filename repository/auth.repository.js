import { prisma } from "../utils/prisma/index.js";

export class AuthRepository {
  //회원가입
  signup = async (email, nickname, hash, userType) => {
    const signupUser = await prisma.users.create({
      data: {
        email,
        nickname,
        password: hash,
        userType,
      },
    });
    return signupUser;
  };

  // user email 중복 확인
  existsEmail = async (email) => {
    const existsEmail = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    return existsEmail;
  };

  // user nickname 중복 확인
  existsNickname = async (nickname) => {
    const existsNickname = await prisma.users.findUnique({
      where: {
        nickname,
      },
    });
    return existsNickname;
  };

  //로그인
  signin = async (email) => {
    const login = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    return login;
  };
}
