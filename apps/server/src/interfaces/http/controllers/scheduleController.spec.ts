import { ScheduleController } from "@/interfaces/http/controllers/scheduleController";
import { Request, Response } from "express";
import * as scheduleService from "@/application/use-cases/scheduleUseCase";

jest.mock("@/application/use-cases/scheduleUseCase");

const mockRequest = (data: any) =>
  ({
    body: data,
    params: {},
  }) as Request;

const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
};

describe("Schedule Controller", () => {
  const scheduleController = new ScheduleController();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should create a schedule", async () => {
    const req = mockRequest({
      name: "Event",
      quantity: 1,
      startDate: new Date(),
      returnDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      weekDay: "Thursday",
      equipmentId: 1,
      type: "Event",
    });
    const res = mockResponse();

    (scheduleService.createSchedule as jest.Mock).mockResolvedValue(req.body);

    await scheduleController.create(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });

  test("should handle error when creating schedule", async () => {
    const req = mockRequest({});
    const res = mockResponse();

    (scheduleService.createSchedule as jest.Mock).mockRejectedValue(
      new Error("Some error")
    );

    await scheduleController.create(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Some error" });
  });
});
