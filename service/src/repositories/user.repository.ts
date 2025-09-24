import { prisma } from "../libs";
import { User } from "@prisma/client";

const UserRepository = {
  findById: async (id: number): Promise<User | null> => {
    return await prisma.user.findUnique({
      where: { id },
    });
  },

  findAllUser: async (): Promise<User[]> => {
    return await prisma.user.findMany();
  },
};

export default UserRepository;
