import { ScheduleRepository } from "@/infra/repositories/scheduleRepository";
import { ScheduleDTO } from "@/application/dtos/scheduleDTO";
import prisma from "@/infra/prisma/client";

const scheduleRepository = new ScheduleRepository();

describe("ScheduleRepository", () => {
  test("should create a schedule", async () => {
    const equipment = await prisma.equipment.create({
      data: {
        name: "Projector",
        type: "Electronics",
        quantity: 5,
        number: Math.floor(Math.random() * 1000000),
      },
    });

    const scheduleData: ScheduleDTO = {
      name: "Meeting",
      quantity: 1,
      startDate: new Date(),
      returnDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      weekDay: "Monday",
      equipmentId: equipment.id,
      type: "Regular",
      returned: false,
    };

    const schedule = await scheduleRepository.createSchedule(scheduleData);

    expect(schedule).toBeDefined();
    expect(schedule.name).toBe(scheduleData.name);
    expect(schedule.quantity).toBe(scheduleData.quantity);
    expect(schedule.equipmentId).toBe(scheduleData.equipmentId);
    expect(schedule.returned).toBe(scheduleData.returned);
  });

  test("should throw error when equipment is not available", async () => {
    const equipment = await prisma.equipment.create({
      data: {
        name: "Laptop",
        type: "Electronics",
        quantity: 0,
        number: Math.floor(Math.random() * 1000000),
      },
    });

    const scheduleData: ScheduleDTO = {
      name: "Conference",
      quantity: 1,
      startDate: new Date(),
      returnDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      weekDay: "Tuesday",
      equipmentId: equipment.id,
      type: "Special",
      returned: false,
    };

    await expect(
      scheduleRepository.createSchedule(scheduleData)
    ).rejects.toThrow(
      "Insufficient equipment quantity available for scheduling."
    );
  });

  test("should throw error when trying to create a schedule with invalid data", async () => {
    const equipment = await prisma.equipment.create({
      data: {
        name: "Projector",
        type: "Electronics",
        quantity: 5,
        number: Math.floor(Math.random() * 1000000),
      },
    });

    const scheduleData: ScheduleDTO = {
      name: "",
      quantity: 1,
      startDate: new Date(),
      returnDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      weekDay: "Monday",
      equipmentId: equipment.id,
      type: "Regular",
      returned: false,
    };

    await expect(
      scheduleRepository.createSchedule(scheduleData)
    ).rejects.toThrow("Schedule name cannot be empty.");
  });
});
