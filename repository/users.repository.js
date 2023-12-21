import { ValidateError } from "../middleware/errorhandling.middleware.js";
import { prisma } from "../utils/prisma/index.js";

export class UsersRepository {
  getUserByUserId = async (userId) => {
    const user = await prisma.users.findUnique({
      where: { userId },
    });
    return user;
  };

  changeUserTypeByManager = async (userId) => {
    try {
      const changedUser = await prisma.users.update({
        where: { userId },
        data: { userType: "manager" },
      });
      return changedUser;
    } catch (e) {
      throw e;
    }
  };
}
