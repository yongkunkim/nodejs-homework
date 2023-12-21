import { prisma } from "../utils/prisma/index.js";
import jwt from "jsonwebtoken";
import pkg from "jsonwebtoken";

export function authMiddleware(req, res, next) {
  console.log("-----------------");

  const { Authorization } = req.cookies;
  console.log(Authorization);

  if (!Authorization) {
    return res.status(401).json({ success: false, message: "로그인 해주세요" });
  }
  // 토큰 표준과 일치하지 않는 경우
  const [tokenType, tokenCredential] = Authorization.split(" ");
  if (!tokenType || !tokenCredential || tokenType !== "Bearer") {
    // 토큰 중 하나라도 없는 경우
    return res.status(401).json({ success: false, message: "로그인 해주세요" });
  }

  // 토큰 에러 종류별로 핸들링 (만료, 삭제)

  try {
    const { userId } = jwt.verify(tokenCredential, process.env.SECRET_KEY);

    // 인증에 성공하는 경우에는 req.locals.user에 인증 된 사용자 정보를 담고, 다음 동작을 진행
    prisma.users.findUnique({ where: { userId } }).then((user) => {
      res.locals.user = user;

      next();
    });
  } catch (error) {
    // JWT의 유효기한이 지난 경우
    if (error instanceof pkg.TokenExpiredError) {
      console.error(error);
      return res.status(401).json({
        success: false,
        message: "토큰이 만료되었어요! 다시 로그인해주세요",
      });
    } else if (error instanceof pkg.JsonWebTokenError) {
      //JWT 검증(JWT Secret 불일치, 데이터 조작으로 인한 Signature 불일치 등)에 실패한 경우
      console.error(error);
      return res.status(401).json({
        success: false,
        message:
          "유효하지 않은 시그니처입니다. JWT Secret Key 확인이 필요합니다.",
      });
    } else if (error instanceof pkg.NotBeforeError) {
      console.error(error);
      return res.status(401).json({
        success: false,
        message: "다시 로그인해주세요",
      });
    } else {
      console.log("---------------");
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "다시 로그인해주세요",
      });
    }
  }
  try {
    const { userId, userType } = jwt.verify(
      tokenCredential,
      process.env.SECRET_KEY
    );

    // 매니저인 경우에만 권한 부여
    if (userType === "manager") {
      req.locals = { userId, userType };
      next();
    } else {
      return res
        .status(403)
        .json({ success: false, message: "매니저 권한이 필요합니다" });
    }
  } catch (error) {
    // 에러 처리...
  }
}
