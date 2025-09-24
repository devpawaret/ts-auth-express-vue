import { prisma } from "../libs";
import { User } from "@prisma/client";

const AuthRepository = {
  findById: async (id: number): Promise<User | null> => {
    return await prisma.user.findUnique({
      where: { id },
    });
  },

  findByUsername: async (username: string): Promise<User | null> => {
    return await prisma.user.findUnique({
      where: { username },
    });
  },

  create: async (username: string, hashedPassword: string): Promise<User> => {
    return await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
  },
};

export default AuthRepository;
