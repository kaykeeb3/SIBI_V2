import { FAQController } from "./FAQController";
import { FAQRepository } from "@/infra/repositories/FAQRepository";
import { GetFAQAnswer } from "@/application/use-cases/getFAQAnswerUseCase";
import { Request, Response, NextFunction } from "express";

// Mock the dependencies
jest.mock("@/infra/repositories/FAQRepository");
jest.mock("@/application/use-cases/getFAQAnswerUseCase");

describe("FAQController", () => {
  let faqController: FAQController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.MockedFunction<NextFunction>;

  beforeEach(() => {
    // Create a new instance for each test to ensure clean state
    faqController = new FAQController();

    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  describe("handle method", () => {
    it("should return error if no question is provided", async () => {
      mockRequest.body = {};

      await faqController.handle(
        mockRequest as Request,
        mockResponse as Response,
        mockNext as NextFunction
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: "Question is required.",
      });
    });

    it("should return answer for a valid question", async () => {
      const mockQuestion = "How does this work?";
      const mockAnswer = "This is how it works.";

      // Directly spy on the execute method of GetFAQAnswer
      const executeSpy = jest
        .spyOn(GetFAQAnswer.prototype, "execute")
        .mockResolvedValue(mockAnswer);

      mockRequest.body = { question: mockQuestion };

      await faqController.handle(
        mockRequest as Request,
        mockResponse as Response,
        mockNext as NextFunction
      );

      expect(mockResponse.json).toHaveBeenCalledWith({ answer: mockAnswer });

      executeSpy.mockRestore();
    });

    it("should call next with error if GetFAQAnswer throws", async () => {
      const mockError = new Error("Test error");

      // Directly spy on the execute method to throw an error
      const executeSpy = jest
        .spyOn(GetFAQAnswer.prototype, "execute")
        .mockRejectedValue(mockError);

      mockRequest.body = { question: "Test question" };

      await faqController.handle(
        mockRequest as Request,
        mockResponse as Response,
        mockNext as NextFunction
      );

      expect(mockNext).toHaveBeenCalledWith(mockError);

      executeSpy.mockRestore();
    });
  });
});
