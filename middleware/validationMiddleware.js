// 회원가입 유효성 검사를 위한 미들웨어

import { check, validationResult } from "express-validator";

const validationMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    return res.status(403).json({ success: false, errors: errors.array() });
  }
};

const ValidationCheck = [
  check("email")
    .trim()
    .notEmpty()
    .withMessage("이메일을 입력해주세요")
    .isEmail()
    .withMessage("이메일이 아닙니다."),
  check("password")
    .trim()
    .notEmpty()
    .withMessage("비밀번호를 입력해주세요")
    .isLength({ min: 6 })
    .withMessage("6자 이상으로 적어주세요!"),
  check("nickname").trim().notEmpty().withMessage("닉네임을 만들어주세요!"),
  check("userType")
    .trim()
    .notEmpty()
    .withMessage("유저 타입을 선택해주세요")
    .isIn(["manager", "user"])
    .withMessage("올바른 유저 타입이 아닙니다."),
  validationMiddleware,
];

export default ValidationCheck;
