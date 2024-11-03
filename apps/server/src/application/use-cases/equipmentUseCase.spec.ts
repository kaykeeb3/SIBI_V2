import { EquipmentRepository } from "@/infra/repositories/equipmentRepository";
import * as equipmentUseCase from "@/application/use-cases/equipmentUseCase";
import { Equipment } from "@/core/domain/entities/equipmentEntity";
import { number } from "zod";

jest.mock("@/infra/repositories/equipmentRepository");

const mockEquipmentRepository = EquipmentRepository as jest.MockedClass<
  typeof EquipmentRepository
>;

describe("Equipment Use Case", () => {
  const equipmentData = {
    name: "Projector",
    type: "Electronics",
    quantity: 10,
    number: 1597522,
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
    mockEquipmentRepository.prototype.createEquipment.mockResolvedValue(
      equipmentEntity
    );

    const result = await equipmentUseCase.createEquipment(equipmentData);
    expect(result).toEqual(equipmentEntity);
    expect(
      mockEquipmentRepository.prototype.createEquipment
    ).toHaveBeenCalledWith(equipmentData);
  });

  it("should get all equipments", async () => {
    mockEquipmentRepository.prototype.getAllEquipments.mockResolvedValue([
      equipmentEntity,
    ]);

    const result = await equipmentUseCase.getAllEquipments();
    expect(result).toEqual([equipmentEntity]);
    expect(
      mockEquipmentRepository.prototype.getAllEquipments
    ).toHaveBeenCalled();
  });

  it("should get equipment by id", async () => {
    mockEquipmentRepository.prototype.getEquipmentById.mockResolvedValue(
      equipmentEntity
    );

    const result = await equipmentUseCase.getEquipmentById(1);
    expect(result).toEqual(equipmentEntity);
    expect(
      mockEquipmentRepository.prototype.getEquipmentById
    ).toHaveBeenCalledWith(1);
  });

  it("should update an equipment", async () => {
    const updatedData = {
      quantity: 5,
      name: "Updated Projector",
      type: "Updated Electronics",
    };

    // Cria uma nova instância de Equipment com os dados atualizados
    const updatedEquipmentEntity = new Equipment(
      1,
      updatedData.name,
      updatedData.type,
      updatedData.quantity
    );

    mockEquipmentRepository.prototype.updateEquipment.mockResolvedValue(
      updatedEquipmentEntity
    );

    const result = await equipmentUseCase.updateEquipment(1, updatedData);
    expect(result).toEqual(updatedEquipmentEntity);
    expect(
      mockEquipmentRepository.prototype.updateEquipment
    ).toHaveBeenCalledWith(1, updatedData);
  });

  it("should delete an equipment", async () => {
    mockEquipmentRepository.prototype.deleteEquipment.mockResolvedValue(
      equipmentEntity
    );

    const result = await equipmentUseCase.deleteEquipment(1);
    expect(result).toEqual(equipmentEntity);
    expect(
      mockEquipmentRepository.prototype.deleteEquipment
    ).toHaveBeenCalledWith(1);
  });
});
