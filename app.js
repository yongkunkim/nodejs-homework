import express from "express";
// import router from "./router/index.js";
import dotenv from "dotenv";

dotenv.config();

// import ErrorHandlingMiddlewqare from "./middlewares/error-handling.js";

const app = express();
const router = express.Router();
const PORT = process.env.PORT;

app.use(express.json());

// app.use(ErrorHandlingMiddlewqare);
app.use("/api", router);

app.listen(PORT, () => {
  console.log(PORT, "포트로 서버가 열렸습니다.");
});
