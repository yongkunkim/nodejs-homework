import express from "express";
// import router from "./router/index.js";
import dotenv from "dotenv";
import router from "./router/index.js";
import cookieParser from "cookie-parser";

dotenv.config();

// import ErrorHandlingMiddlewqare from "./middlewares/error-handling.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

// app.use(ErrorHandlingMiddlewqare);
app.use("/", router);

app.listen(PORT, () => {
  console.log(PORT, "포트로 서버가 열렸습니다.");
});
