import { ValidateError } from "../middleware/errorhandling.middleware.js";
import { AuthRepository } from "../repository/auth.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
  authRepository = new AuthRepository();

  signup = async (email, nickname, password, passwordConfirm, userType) => {
    try {
      //비밀번호 해쉬화
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      //이메일 형식
      let regEmail =
        /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
      //비밀번호 형식
      let pwRef = /^[a-zA-z0-9]{6,12}$/;

      const existsEmail = await this.authRepository.existsEmail(email);

      // 이메일 닉네임 존재하는지 확인
      if (existsEmail)
        throw new ValidateError("Email이 이미 사용중입니다.", 403);

      const existsNickname = await this.authRepository.existsNickname(nickname);
      // 닉네임 중복 확인
      if (existsNickname)
        throw new ValidateError("Nickname이 이미 사용중입니다.", 403);

      //이메일 형식 확인
      if (!regEmail.test(email))
        throw new ValidateError("Email 형식이 올바르지 않습니다.", 403);

      //패스워드 형식 확인
      if (!pwRef.test(password))
        throw new ValidateError("password형식이 올바르지 않습니다.", 403);

      console.log(password, passwordConfirm);

      // confirmpassword 일치 확인
      if (password !== passwordConfirm)
        throw new ValidateError("패스워드가 일치하지 않습니다.", 403);

      const user = await this.authRepository.signup(
        email,
        nickname,
        hash,
        userType
      );
      return {
        email: user.email,
        nickname: user.nickname,
        userType: user.userType,
      };
    } catch (e) {
      throw e;
    }
  };

  signin = async (email, password) => {
    const signinInfo = await this.authRepository.signin(email);
    if (!signinInfo) {
      throw new Error("등록된 Eamil이 없습니다.");
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      signinInfo.password
    );

    if (!isPasswordCorrect) {
      throw new Error("Password를 다시 확인해주세요.");
    }

    const userType = signinInfo.userType;
    const token = jwt.sign(
      {
        userId: signinInfo.userId,
        userType: userType,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "12h",
      }
    );

    return { token, userType };
  };
}
