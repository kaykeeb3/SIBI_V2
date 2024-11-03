import { UserRepository } from "@/infra/repositories/userRepository";
import { hashPassword, comparePassword } from "@/shared/utils/hashPassword";
import { generateToken } from "@/shared/utils/tokenManager";
import { LoginDTO, UserDTO } from "@/application/dtos/userDTO";

const userRepository = new UserRepository();

export async function registerUser(data: UserDTO) {
  const hashedPassword = await hashPassword(data.password);
  const userData = { ...data, password: hashedPassword };
  return userRepository.createUser(userData);
}

export async function loginUser(data: LoginDTO): Promise<string | null> {
  const user = await userRepository.getUserByEmail(data.email);

  if (user && (await comparePassword(data.password, user.password))) {
    return generateToken({ id: user.id });
  }
  return null;
}

export async function getUserDetails(userId: number) {
  // Busca o usuário pelo ID e retorna as informações necessárias
  return userRepository.getUserById(userId);
}
