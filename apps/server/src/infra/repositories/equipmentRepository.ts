import prisma from "@/infra/prisma/client";
import { Equipment } from "@/core/domain/entities/equipmentEntity";
import { EquipmentDTO } from "@/application/dtos/equipmentDTO";

export class EquipmentRepository {
  async createEquipment(data: EquipmentDTO): Promise<Equipment> {
    const existingEquipment = await prisma.equipment.findUnique({
      where: { number: data.number },
    });

    if (existingEquipment) {
      throw new Error("Equipment with this number already exists.");
    }

    const equipment = await prisma.equipment.create({
      data: {
        name: data.name,
        type: data.type,
        quantity: data.quantity,
        number: data.number,
      },
    });

    return new Equipment(
      equipment.id,
      equipment.name,
      equipment.type,
      equipment.quantity
    );
  }

  async getAllEquipments(): Promise<Equipment[]> {
    const equipments = await prisma.equipment.findMany();
    return equipments.map(
      (equipment) =>
        new Equipment(
          equipment.id,
          equipment.name,
          equipment.type,
          equipment.quantity
        )
    );
  }

  async getEquipmentById(id: number): Promise<Equipment> {
    const equipment = await prisma.equipment.findUnique({ where: { id } });
    if (!equipment) throw new Error("Equipment not found");
    return new Equipment(
      equipment.id,
      equipment.name,
      equipment.type,
      equipment.quantity
    );
  }

  async updateEquipment(
    id: number,
    data: Partial<EquipmentDTO>
  ): Promise<Equipment> {
    const equipment = await prisma.equipment.update({ where: { id }, data });
    return new Equipment(
      equipment.id,
      equipment.name,
      equipment.type,
      equipment.quantity
    );
  }

  async deleteEquipment(id: number): Promise<Equipment> {
    const equipment = await prisma.equipment.delete({ where: { id } });
    return new Equipment(
      equipment.id,
      equipment.name,
      equipment.type,
      equipment.quantity
    );
  }
}
