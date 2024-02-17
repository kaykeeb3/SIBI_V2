const jwt = require("jsonwebtoken");
const { login, getUserProfile } = require("../controllers/authController");
//const prisma = require("../prisma"); // Supondo que você tenha um arquivo prisma.js que exporta uma instância do Prisma

jest.mock("jsonwebtoken");

describe("login", () => {
  it("should return a token when login is successful", async () => {
    const user = { id: 1, nome: "testuser", senha: "testpassword" };
    const token = "mockedToken";
    const mockedPrisma = {
      user: {
        findUnique: jest.fn().mockResolvedValue(user),
      },
    };
    jwt.sign.mockReturnValue(token);

    const result = await login(
      { nome: "testuser", senha: "testpassword" },
      mockedPrisma
    );

    expect(result).toBe(token);
  });

  it("should throw an error when login fails", async () => {
    const mockedPrisma = {
      user: {
        findUnique: jest.fn().mockResolvedValue(null),
      },
    };

    await expect(
      login({ nome: "invaliduser", senha: "invalidpassword" }, mockedPrisma)
    ).rejects.toThrow("Credenciais inválidas");
  });
});

describe("getUserProfile", () => {
  it("should return user profile when user is found", async () => {
    const user = { id: 1, nome: "testuser" };
    const mockedPrisma = {
      user: {
        findUnique: jest.fn().mockResolvedValue(user),
      },
    };

    const result = await getUserProfile(1, mockedPrisma);

    expect(result).toEqual(user);
  });

  it("should throw an error when user is not found", async () => {
    const mockedPrisma = {
      user: {
        findUnique: jest.fn().mockResolvedValue(null),
      },
    };

    await expect(getUserProfile(999, mockedPrisma)).rejects.toThrow(
      "Usuário não encontrado"
    );
  });
});
