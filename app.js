import express from "express";
import dotenv from "dotenv";
import router from "./router/index.js";
import cookieParser from "cookie-parser";
import errorHandling from "./middleware/errorhandling.middleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use(errorHandling);
app.use("/", router);

app.listen(PORT, () => {
  console.log(PORT, "포트로 서버가 열렸습니다.");
});
