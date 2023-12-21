import express from "express";
import { UsersController } from "../controller/users.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();
const usersController = new UsersController();

//학생 매니저로 승급시키기
router.put(
  "/changeUserType/:userId",
  authMiddleware,
  usersController.changeUserTypeByManager
);

export default router;
