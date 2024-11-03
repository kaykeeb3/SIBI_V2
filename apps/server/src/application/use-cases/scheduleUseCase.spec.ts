import { ScheduleRepository } from "@/infra/repositories/scheduleRepository";
import * as scheduleUseCase from "@/application/use-cases/scheduleUseCase";
import { Schedule } from "@/core/domain/entities/scheduleEntity";

jest.mock("@/infra/repositories/scheduleRepository");

const mockScheduleRepository = ScheduleRepository as jest.MockedClass<
  typeof ScheduleRepository
>;

describe("Schedule Use Case", () => {
  const scheduleData = {
    name: "Meeting",
    quantity: 1,
    startDate: new Date(),
    returnDate: new Date(new Date().setDate(new Date().getDate() + 7)),
    weekDay: "Monday",
    equipmentId: 1,
    returned: false,
    type: "Work",
  };

  const scheduleEntity = new Schedule(
    1,
    scheduleData.name,
    scheduleData.quantity,
    scheduleData.startDate,
    scheduleData.returnDate,
    scheduleData.weekDay,
    scheduleData.equipmentId,
    scheduleData.returned,
    scheduleData.type
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a schedule", async () => {
    mockScheduleRepository.prototype.createSchedule.mockResolvedValue(
      scheduleEntity
    );

    const result = await scheduleUseCase.createSchedule(scheduleData);
    expect(result).toEqual(scheduleEntity);
    expect(
      mockScheduleRepository.prototype.createSchedule
    ).toHaveBeenCalledWith(scheduleData);
  });

  it("should get all schedules", async () => {
    mockScheduleRepository.prototype.getAllSchedules.mockResolvedValue([
      scheduleEntity,
    ]);

    const result = await scheduleUseCase.getAllSchedules();
    expect(result).toEqual([scheduleEntity]);
    expect(mockScheduleRepository.prototype.getAllSchedules).toHaveBeenCalled();
  });

  it("should get schedule by id", async () => {
    mockScheduleRepository.prototype.getScheduleById.mockResolvedValue(
      scheduleEntity
    );

    const result = await scheduleUseCase.getScheduleById(1);
    expect(result).toEqual(scheduleEntity);
    expect(
      mockScheduleRepository.prototype.getScheduleById
    ).toHaveBeenCalledWith(1);
  });

  it("should update a schedule", async () => {
    const updatedData = { ...scheduleData, quantity: 2 };
    mockScheduleRepository.prototype.updateSchedule.mockResolvedValue({
      ...scheduleEntity,
      quantity: updatedData.quantity,
    });

    const result = await scheduleUseCase.updateSchedule(1, updatedData);
    expect(result.quantity).toBe(updatedData.quantity);
    expect(
      mockScheduleRepository.prototype.updateSchedule
    ).toHaveBeenCalledWith(1, updatedData);
  });

  it("should delete a schedule", async () => {
    mockScheduleRepository.prototype.deleteSchedule.mockResolvedValue(
      scheduleEntity
    );

    const result = await scheduleUseCase.deleteSchedule(1);
    expect(result).toEqual(scheduleEntity);
    expect(
      mockScheduleRepository.prototype.deleteSchedule
    ).toHaveBeenCalledWith(1);
  });
});
