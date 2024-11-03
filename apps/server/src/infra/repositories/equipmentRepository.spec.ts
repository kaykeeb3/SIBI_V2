import prisma from "@/infra/prisma/client";
import { EquipmentRepository } from "@/infra/repositories/equipmentRepository";
import { Equipment } from "@/core/domain/entities/equipmentEntity";

jest.mock("@/infra/prisma/client", () => ({
  equipment: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

describe("Equipment Repository", () => {
  const equipmentRepository = new EquipmentRepository();

  const equipmentData = {
    name: "Projector",
    type: "Electronics",
    quantity: 10,
    number: 1234,
  };

  const equipmentEntity = new Equipment(
    1,
    equipmentData.name,
    equipmentData.type,
    equipmentData.quantity
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create an equipment", async () => {
    (prisma.equipment.create as jest.Mock).mockResolvedValue({
      id: 1,
      ...equipmentData,
    });

    const result = await equipmentRepository.createEquipment(equipmentData);
    expect(result).toEqual(equipmentEntity);
    expect(prisma.equipment.create).toHaveBeenCalledWith({
      data: equipmentData,
    });
  });

  it("should get all equipments", async () => {
    (prisma.equipment.findMany as jest.Mock).mockResolvedValue([
      {
        id: 1,
        ...equipmentData,
      },
    ]);

    const result = await equipmentRepository.getAllEquipments();
    expect(result).toEqual([equipmentEntity]);
    expect(prisma.equipment.findMany).toHaveBeenCalled();
  });

  it("should get equipment by id", async () => {
    (prisma.equipment.findUnique as jest.Mock).mockResolvedValue({
      id: 1,
      ...equipmentData,
    });

    const result = await equipmentRepository.getEquipmentById(1);
    expect(result).toEqual(equipmentEntity);
    expect(prisma.equipment.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it("should update an equipment", async () => {
    const updatedData = {
      name: "Updated Projector",
      type: "Updated Electronics",
      quantity: 5,
      number: 1234,
    };
    (prisma.equipment.update as jest.Mock).mockResolvedValue({
      id: 1,
      ...updatedData,
    });

    const result = await equipmentRepository.updateEquipment(1, updatedData);
    expect(result).toEqual(
      new Equipment(1, updatedData.name, updatedData.type, updatedData.quantity)
    );
    expect(prisma.equipment.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: updatedData,
    });
  });

  it("should delete an equipment", async () => {
    (prisma.equipment.delete as jest.Mock).mockResolvedValue({
      id: 1,
      ...equipmentData,
    });

    const result = await equipmentRepository.deleteEquipment(1);
    expect(result).toEqual(equipmentEntity);
    expect(prisma.equipment.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it("should throw an error when creating an equipment with duplicate number", async () => {
    (prisma.equipment.findUnique as jest.Mock).mockResolvedValueOnce({
      id: 1,
      ...equipmentData,
    });

    await expect(
      equipmentRepository.createEquipment(equipmentData)
    ).rejects.toThrow("Equipment with this number already exists.");

    expect(prisma.equipment.findUnique).toHaveBeenCalledWith({
      where: { number: equipmentData.number },
    });
  });
});
