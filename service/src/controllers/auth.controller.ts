import { Request, Response } from "express";
import { RegisterDto, LoginDto } from "../types/auth";
import AuthService from "../services/auth.service";
import config from "../configs";

const AuthController = {
  register: async (req: Request, res: Response): Promise<void> => {
    try {
      const dto: RegisterDto = req.body;
      await AuthService.register(dto);

      res.status(201).json({
        message: "สมัครสมาชิกสำเร็จ",
      });
    } catch (err: any) {
      res.status(401).json({
        message: err.message || "ข้อผิดพลาดภายในเซิร์ฟเวอร์",
      });
    }
  },

  login: async (req: Request, res: Response): Promise<void> => {
    try {
      const dto: LoginDto = req.body;
      const { accessToken, refreshToken, user } = await AuthService.login(dto);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: config.nodeEnv === "production",
        sameSite: "strict",
        maxAge: config.cookieMaxAge,
      });

      res.status(200).json({
        accessToken,
        user,
        message: "เข้าสู่ระบบสำเร็จ",
      });
    } catch (err: any) {
      res.status(401).json({
        message: err.message || "ข้อผิดพลาดภายในเซิร์ฟเวอร์",
      });
    }
  },

  logout: async (req: Request, res: Response): Promise<void> => {
    res.clearCookie("refreshToken");

    res.status(200).json({
      message: "ออกจากระบบเรียบร้อย",
    });
  },

  refresh: async (req: Request, res: Response): Promise<void> => {
    try {
      const refreshToken = req.cookies.refreshToken;
      const newAccessToken = await AuthService.refresh(refreshToken);

      res.status(200).json({
        accessToken: newAccessToken,
      });
    } catch (err: any) {
      res.status(401).json({
        message: err.message || "ข้อผิดพลาดภายในเซิร์ฟเวอร์",
      });
    }
  },

  me: async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).user.userId;
      const { user } = await AuthService.me(userId);

      res.status(200).json({
        user,
      });
    } catch (err: any) {
      res.status(401).json({
        message: err.message || "ข้อผิดพลาดภายในเซิร์ฟเวอร์",
      });
    }
  },
};

export default AuthController;
