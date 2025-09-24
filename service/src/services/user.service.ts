import { SafeUser } from "../types/auth";
import UserRepository from "../repositories/user.repository";

const UserService = {
  getAllUser: async (): Promise<SafeUser[]> => {
    const users = await UserRepository.findAllUser();
    if (!users || users.length === 0) throw new Error("ไม่พบผู้ใช้ในระบบ");

    return users.map(({ password, ...safeUser }) => safeUser);
  },
};

export default UserService;
