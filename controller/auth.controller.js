import { AuthService } from "../service/auth.service.js";

export class AuthController {
  authService = new AuthService();

  signup = async (req, res, next) => {
    try {
      {
        const { email, nickname, password, passwordConfirm, userType } =
          req.body;
        const user = await this.authService.signup(
          email,
          nickname,
          password,
          passwordConfirm,
          userType
        );
        return res.send({
          success: true,
          message: "회원가입이 완료되었습니다.",
          userType: `${user.userType}`,
        });
      }
    } catch (e) {
      next(e);
    }
  };

  signin = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const login = await this.authService.signin(email, password);
      res.cookie("Authorization", "Bearer " + login.token);
      res.header("Authorization", `Bearer ${login.token}`);
      if (login.userType === "manager") {
        res.status(200).json({
          message: "매니저 로그인입니다.",
          token: `Bearer ${login.token}`,
          usertype: login.userType,
        });
      }
      if (login.userType === "user") {
        res.status(200).json({
          message: "학생 로그인입니다.",
          token: `Bearer ${login.token}`,
          usertype: login.userType,
        });
      }
    } catch (err) {
      next(err);
    }
  };
}
