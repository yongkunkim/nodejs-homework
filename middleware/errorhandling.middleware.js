export class ValidateError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "ValidateError";
    this.statusCode = statusCode;
  }
}

const errorHandling = async (err, req, res, next) => {
  console.error(err);

  if (!err.statusCode || err.statusCode === 500) {
    return res.status(500).json({
      message: "알 수 없는 에러가 발생했습니다. 관리자에게 문의하세요.",
    });
  }

  return res.status(err.statusCode).json({ message: err.message });
};

export default errorHandling;
