import prisma from "@/infra/prisma/client";
import { UserDTO, PartialUserDTO } from "@/application/dtos/userDTO";
import { User } from "@/core/domain/entities/userEntity";

export class UserRepository {
  async createUser(data: UserDTO): Promise<User> {
    const user = await prisma.user.create({ data });
    return new User(
      user.id,
      user.email,
      user.password,
      user.name,
      user.institution,
      user.limit,
      user.role,
      user.phone,
      user.profilePicture
    );
  }

  async getUserById(id: number): Promise<User> {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new Error("User not found");

    return new User(
      user.id,
      user.email,
      user.password,
      user.name,
      user.institution,
      user.limit,
      user.role,
      user.phone,
      user.profilePicture
    );
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("User not found");

    return new User(
      user.id,
      user.email,
      user.password,
      user.name,
      user.institution,
      user.limit,
      user.role,
      user.phone,
      user.profilePicture
    );
  }

  async getAllUsers(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users.map(
      (user) =>
        new User(
          user.id,
          user.email,
          user.password,
          user.name,
          user.institution,
          user.limit,
          user.role,
          user.phone,
          user.profilePicture,
          user.createdAt // Incluindo createdAt no retorno
        )
    );
  }

  async updateUser(id: number, data: PartialUserDTO): Promise<User> {
    const user = await prisma.user.update({
      where: { id },
      data,
    });
    return new User(
      user.id,
      user.email,
      user.password,
      user.name,
      user.institution,
      user.limit,
      user.role,
      user.phone,
      user.profilePicture,
      user.createdAt
    );
  }

  async deleteUser(id: number): Promise<User> {
    const user = await prisma.user.delete({ where: { id } });
    return new User(
      user.id,
      user.email,
      user.password,
      user.name,
      user.institution,
      user.limit,
      user.role,
      user.phone,
      user.profilePicture,
      user.createdAt
    );
  }
}
