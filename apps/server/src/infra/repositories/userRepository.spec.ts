import * as authUseCase from "@/application/use-cases/authUseCase";
import { UserRepository } from "@/infra/repositories/userRepository";
import { hashPassword, comparePassword } from "@/shared/utils/hashPassword";
import { generateToken } from "@/shared/utils/tokenManager";
import { UserDTO, LoginDTO } from "@/application/dtos/userDTO";

jest.mock("@/infra/repositories/userRepository");
jest.mock("@/shared/utils/hashPassword");
jest.mock("@/shared/utils/tokenManager");

describe("Auth Use Case", () => {
  const mockUser = {
    id: 1,
    email: "user@example.com",
    password: "hashedPassword",
    name: "User Name",
    institution: "Institution",
    limit: 10,
    role: "USER",
    phone: "123456789",
    profilePicture: "profile.png",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should register a user", async () => {
    (hashPassword as jest.Mock).mockResolvedValue("hashedPassword");
    (UserRepository.prototype.createUser as jest.Mock).mockResolvedValue(
      mockUser
    );

    const userData: UserDTO = {
      email: "user@example.com",
      password: "123456",
      name: "User Name",
      institution: "Institution",
      limit: 10,
      role: "USER",
      phone: "123456789",
      profilePicture: "profile.png",
    };

    const result = await authUseCase.registerUser(userData);

    expect(hashPassword).toHaveBeenCalledWith("123456");
    expect(UserRepository.prototype.createUser).toHaveBeenCalledWith({
      ...userData,
      password: "hashedPassword",
    });
    expect(result).toEqual(mockUser);
  });

  it("should login a user and return a token", async () => {
    (UserRepository.prototype.getUserByEmail as jest.Mock).mockResolvedValue(
      mockUser
    );
    (comparePassword as jest.Mock).mockResolvedValue(true);
    (generateToken as jest.Mock).mockReturnValue("jwt-token");

    const loginData: LoginDTO = {
      email: "user@example.com",
      password: "123456",
    };

    const token = await authUseCase.loginUser(loginData);

    expect(UserRepository.prototype.getUserByEmail).toHaveBeenCalledWith(
      "user@example.com"
    );
    expect(comparePassword).toHaveBeenCalledWith("123456", mockUser.password);
    expect(token).toEqual("jwt-token");
  });

  it("should return null for invalid login credentials", async () => {
    (UserRepository.prototype.getUserByEmail as jest.Mock).mockResolvedValue(
      mockUser
    );
    (comparePassword as jest.Mock).mockResolvedValue(false);

    const loginData: LoginDTO = {
      email: "user@example.com",
      password: "wrong_password",
    };

    const token = await authUseCase.loginUser(loginData);

    expect(UserRepository.prototype.getUserByEmail).toHaveBeenCalledWith(
      "user@example.com"
    );
    expect(comparePassword).toHaveBeenCalledWith(
      "wrong_password",
      mockUser.password
    );
    expect(token).toBeNull();
  });

  it("should throw an error if user not found during login", async () => {
    (UserRepository.prototype.getUserByEmail as jest.Mock).mockResolvedValue(
      null
    );

    const loginData: LoginDTO = {
      email: "nonexistent@example.com",
      password: "123456",
    };

    await expect(authUseCase.loginUser(loginData)).resolves.toBeNull();
  });
});
