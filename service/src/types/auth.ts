import { User } from "@prisma/client";

export interface RegisterDto {
  username: string;
  password: string;
}

export interface LoginDto {
  username: string;
  password: string;
}

/*
    # Omit<Type, Keys>

    * ใช้สำหรับ "ลบ" key ที่ไม่ต้องการออกจาก type

    ตัวอย่าง:
        type User = {
            id: string;
            username: string;
            password: string;
        }

        type SafeUser = {
            id: string;
            username: string;
        }
*/
export type SafeUser = Omit<User, "password">;
