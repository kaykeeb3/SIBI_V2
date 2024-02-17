const axios = require("axios");
const {
  login,
  fetchUserProfile,
  getTokenFromLocalStorage,
} = require("../services/auth");

jest.mock("axios");

describe("fetchUserProfile", () => {
  it("should throw an error when fetching user profile fails", async () => {
    const errorMessage = "Internal Server Error";
    process.env.TOKEN = "mockedToken";
    axios.get.mockRejectedValue(new Error(errorMessage));
    await expect(fetchUserProfile()).rejects.toThrow(errorMessage);
  });

  it("should return user profile when token is present", async () => {
    const mockToken = "mockedToken";
    const mockUserProfile = { name: "John Doe", email: "john@example.com" };
    process.env.TOKEN = mockToken;
    axios.get.mockResolvedValue({ data: mockUserProfile });
    const userProfile = await fetchUserProfile();
    expect(userProfile).toEqual(mockUserProfile);
  });

  it("should throw an error when token is not present", async () => {
    process.env.TOKEN = null;
    await expect(fetchUserProfile()).rejects.toThrow(
      "Token não encontrado. Por favor, faça login primeiro."
    );
  });

  it("should throw an error when fetching user profile fails", async () => {
    const errorMessage = "Internal Server Error";
    process.env.TOKEN = "mockedToken";
    axios.get.mockRejectedValue(new Error(errorMessage));
    await expect(fetchUserProfile()).rejects.toThrow(errorMessage);
  });
});

describe("getTokenFromLocalStorage", () => {
  it("should return token from environment variable", () => {
    process.env.TOKEN = "mockedToken";
    const token = getTokenFromLocalStorage();
    expect(token).toBe(process.env.TOKEN);
  });

  it("should return null when token is not present", () => {
    process.env.TOKEN = null;
    const token = getTokenFromLocalStorage();
    expect(token).toBeNull();
  });
});
