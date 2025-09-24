import { Request, Response } from "express";
import { SafeUser } from "../types/auth";
import UserService from "../services/user.service";

const UserController = {
  getAllUser: async (req: Request, res: Response): Promise<void> => {
    try {
      const users: SafeUser[] = await UserService.getAllUser();

      res.status(200).json({
        users,
      });
    } catch (err: any) {
      res.status(401).json({
        message: err.message || "ข้อผิดพลาดภายในเซิร์ฟเวอร์",
      });
    }
  },
};

export default UserController;
