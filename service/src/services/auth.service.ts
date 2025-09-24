import { RegisterDto, LoginDto, SafeUser } from "../types/auth";
import AuthRepository from "../repositories/auth.repository";
import bcrypt from "bcrypt";
import { jwt } from "../libs";

const AuthService = {
  register: async (dto: RegisterDto): Promise<void> => {
    const existing = await AuthRepository.findByUsername(dto.username);
    if (existing) throw new Error("ชื่อผู้ใช้นี้ถูกใช้ไปแล้ว");

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    await AuthRepository.create(dto.username, hashedPassword);
  },

  login: async (
    dto: LoginDto
  ): Promise<{ accessToken: string; refreshToken: string; user: SafeUser }> => {
    const user = await AuthRepository.findByUsername(dto.username);
    if (!user) throw new Error("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) throw new Error("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");

    const accessToken = jwt.generateAccessToken({
      userId: user.id,
      role: user.role,
    });

    const refreshToken = jwt.generateRefreshToken({
      userId: user.id,
    });

    const { password, ...safeUser } = user;
    return { accessToken, refreshToken, user: safeUser };
  },

  refresh: async (refreshToken: string): Promise<string> => {
    if (!refreshToken) throw new Error("กรุณาเข้าสู่ระบบใหม่อีกครั้ง");

    const payload = jwt.verifyRefreshToken(refreshToken);

    const user = await AuthRepository.findById(payload.userId);
    if (!user) throw new Error("ไม่พบผู้ใช้");

    const newAccessToken = jwt.generateAccessToken({
      userId: user.id,
      role: user.role,
    });

    return newAccessToken;
  },

  me: async (userId: number): Promise<{ user: SafeUser }> => {
    const user = await AuthRepository.findById(userId);
    if (!user) throw new Error("ไม่พบผู้ใช้");

    const { password, ...safeUser } = user;
    return { user: safeUser };
  },
};

export default AuthService;
