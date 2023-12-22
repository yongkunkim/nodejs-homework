import { UsersService } from "../service/users.service.js";

export class UsersController {
  usersService = new UsersService();

  //매니저가 회원종류 수정
  changeUserTypeByManager = async (req, res, next) => {
    try {
      const userId = parseInt(req.params.userId);
      const userType = req.locals.userType;
      const changedUser = await this.usersService.changeUserTypeByManager(
        userId,
        userType
      );

      res.send({
        message: "학생을 매니저로 승급시켰습니다.",
        changedUser,
      });
    } catch (e) {
      next(e);
    }
  };
}
