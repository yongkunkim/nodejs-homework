import { ValidateError } from "../middleware/errorhandling.middleware.js";
import { UsersRepository } from "../repository/users.repository.js";

export class UsersService {
  usersRepository = new UsersRepository();

  changeUserTypeByManager = async (userId, userType) => {
    try {
      const user = await this.usersRepository.getUserByUserId(userId);
      if (user.userType === "manager") {
        throw new ValidateError("매니저의 등급은 바꿀 수 없습니다.", 401);
      }
      if (userType !== "manager") {
        throw new ValidateError("권한이 없습니다.", 401);
      }
      const changedUser = await this.usersRepository.changeUserTypeByManager(
        userId
      );

      return changedUser;
    } catch (e) {
      throw e;
    }
  };
}
