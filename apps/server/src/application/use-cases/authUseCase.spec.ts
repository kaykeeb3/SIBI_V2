import { Request, Response } from "express";
import { AuthController } from "@/interfaces/http/controllers/authController";
import * as authUseCase from "@/application/use-cases/authUseCase";
import { verifyToken } from "@/shared/utils/tokenManager";

jest.mock("@/application/use-cases/authUseCase");
jest.mock("@/shared/utils/tokenManager");

describe("Auth Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  const authController = new AuthController();

  beforeEach(() => {
    req = {};
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    jest.clearAllMocks();
  });

  it("should register a user", async () => {
    req.body = {
      name: "User Name",
      email: "user@example.com",
      password: "123456",
      institution: "Institution",
      limit: 10,
      role: "USER",
    };
    (authUseCase.registerUser as jest.Mock).mockResolvedValue({
      id: 1,
      email: "user@example.com",
    });

    await authController.register(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      user: { id: 1, email: "user@example.com" },
    });
  });

  it("should login a user", async () => {
    req.body = { email: "user@example.com", password: "123456" };
    (authUseCase.loginUser as jest.Mock).mockResolvedValue("jwt-token");

    await authController.login(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith({ token: "jwt-token" });
  });

  it("should return 401 for invalid credentials", async () => {
    req.body = { email: "user@example.com", password: "wrong_password" };
    (authUseCase.loginUser as jest.Mock).mockResolvedValue(null);

    await authController.login(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid credentials" });
  });

  it("should verify access and return user details based on token", async () => {
    req.headers = { authorization: "Bearer jwt-token" };
    (verifyToken as jest.Mock).mockReturnValue({ id: 1 });

    const mockUserDetails = {
      name: "User Name",
      role: "USER",
      profilePicture:
        "https://img.freepik.com/fotos-gratis/pessoa-de-origem-indiana-se-divertindo_23-2150285283.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1728259200&semt=ais_hybridg",
    };
    (authUseCase.getUserDetails as jest.Mock).mockResolvedValue(
      mockUserDetails
    );

    await authController.verifyAccess(req as Request, res as Response);

    expect(verifyToken).toHaveBeenCalledWith("jwt-token");
    expect(authUseCase.getUserDetails).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUserDetails);
  });

  it("should return 401 if token is invalid", async () => {
    req.headers = { authorization: "Bearer invalid-token" };
    (verifyToken as jest.Mock).mockReturnValue(null);

    await authController.verifyAccess(req as Request, res as Response);

    expect(verifyToken).toHaveBeenCalledWith("invalid-token");
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid token" });
  });
});
